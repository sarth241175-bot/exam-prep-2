import { GoogleGenAI, Type } from "@google/genai";
import type { StudyPlan, UserInputs } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        examName: { type: Type.STRING },
        plan: {
            type: Type.ARRAY,
            description: "The structured study plan broken into 20-day cycles.",
            items: {
                type: Type.OBJECT,
                properties: {
                    cycle: { type: Type.STRING, description: "The cycle duration, e.g., 'Days 1-20'" },
                    chapters: {
                        type: Type.ARRAY,
                        description: "A list of chapters to cover in this cycle.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                weightage: { type: Type.STRING, description: "Can be 'High', 'Medium', or 'Low'" },
                                questionsToPractice: { type: Type.STRING, description: "Recommended number of questions to practice for this chapter, e.g., '50-60 MCQs'." }
                            },
                            required: ["name", "weightage", "questionsToPractice"]
                        }
                    },
                    revisionStrategy: { type: Type.STRING, description: "Actionable revision strategy for this cycle." }
                },
                required: ["cycle", "chapters", "revisionStrategy"]
            }
        },
        finalAdvice: { type: Type.STRING, description: "A final encouraging paragraph for the student." }
    },
    required: ["examName", "plan", "finalAdvice"]
};

export const generateStudyPlan = async (inputs: UserInputs): Promise<StudyPlan> => {
    const { stream, exam, daysRemaining, chaptersCompleted, studyStyle, targetRank } = inputs;

    const prompt = `
        You are an expert academic counselor and exam strategist for Indian entrance exams for students after class 12th. Your goal is to create a highly personalized, realistic, and effective study plan.

        First, you MUST use your internal knowledge of the latest official 2025 syllabus for the specified exam to determine the total number of chapters.

        Then, generate a study plan based on the following student details:
        - Student's Stream: ${stream}
        - Exam Name: ${exam}
        - Time Remaining: ${daysRemaining} days
        - Chapters Already Completed: ${chaptersCompleted}
        - Preferred Study Style: ${studyStyle}. Please tailor your advice accordingly. For 'Active' study, suggest methods like practice tests, Feynman technique, and group study. For 'Passive' study, suggest high-quality lectures, note-taking strategies, and reading techniques.
        - Target Rank: ${targetRank}

        Your response MUST be a valid JSON object that strictly adheres to the provided schema. Do not include any markdown formatting like \`\`\`json.

        Your tasks are:
        1.  **Study Plan:** Based on the total chapters from the 2025 syllabus and the chapters already completed, calculate the remaining chapters. Create a detailed study plan broken down into 20-day cycles to cover these remaining chapters within ${daysRemaining} days.
            - For each cycle, list the chapters to be studied. Prioritize chapters based on their typical weightage in the exam. You MUST categorize the weightage for each chapter as 'High', 'Medium', or 'Low'.
            - For each chapter, you MUST provide a "questionsToPractice" recommendation, which is the estimated number/type of questions needed to master the chapter (e.g., "50-60 MCQs", "10-15 subjective questions"). This is crucial.
            - For each cycle, provide a specific and actionable revision strategy tailored to the ${studyStyle} preference. This should include how to revise the chapters completed in the current cycle and also how to revise older topics.
        2.  **Final Advice:** Provide a concluding paragraph with encouraging and motivational advice for the student.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.6,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as StudyPlan;
    } catch (error) {
        console.error("Error generating study plan from Gemini:", error);
        throw new Error("The AI model failed to generate a valid plan. This might be a temporary issue. Please try again.");
    }
};