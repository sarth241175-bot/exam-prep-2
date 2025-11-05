import React, { useState, useCallback, useMemo } from 'react';
import { UserInputs, StudyPlan } from './types';
import { STREAMS, EXAMS_BY_STREAM, STUDY_STYLES } from './constants';
import { generateStudyPlan } from './services/geminiService';
import PlanDisplay from './components/PlanDisplay';
import FormInput from './components/FormInput';
import FormSelect from './components/FormSelect';
import Header from './components/Header';
import Loader from './components/Loader';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [formData, setFormData] = useState<UserInputs>({
    stream: STREAMS[0],
    exam: EXAMS_BY_STREAM[STREAMS[0]][0],
    daysRemaining: 90,
    chaptersCompleted: 10,
    studyStyle: STUDY_STYLES[0],
    targetRank: 'Top 1%',
  });
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableExams = useMemo(() => {
    return EXAMS_BY_STREAM[formData.stream] || [];
  }, [formData.stream]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'stream') {
      const newExams = EXAMS_BY_STREAM[value] || [];
      setFormData(prev => ({
        ...prev,
        stream: value,
        exam: newExams[0] || ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setStudyPlan(null);

    try {
      if (Number(formData.chaptersCompleted) < 0) {
        throw new Error("Chapters completed cannot be a negative number.");
      }
      const plan = await generateStudyPlan(formData);
      setStudyPlan(plan);
    } catch (err: any)      {
      setError(err.message || 'Failed to generate study plan. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 sticky top-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Your Details</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">Fill in your preparation details to get a personalized plan.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormSelect
                  label="Your Stream"
                  name="stream"
                  value={formData.stream}
                  onChange={handleChange}
                  options={STREAMS}
                />
                <FormSelect
                  label="Exam You're Preparing For"
                  name="exam"
                  value={formData.exam}
                  onChange={handleChange}
                  options={availableExams}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="Days Remaining"
                    name="daysRemaining"
                    type="number"
                    value={String(formData.daysRemaining)}
                    onChange={handleChange}
                    placeholder="e.g., 90"
                    min="1"
                  />
                   <FormInput
                    label="Chapters Completed"
                    name="chaptersCompleted"
                    type="number"
                    value={String(formData.chaptersCompleted)}
                    onChange={handleChange}
                    placeholder="e.g., 10"
                    min="0"
                  />
                </div>
                <FormInput
                  label="Target Rank"
                  name="targetRank"
                  type="text"
                  value={formData.targetRank}
                  onChange={handleChange}
                  placeholder="e.g., Top 100"
                />
                <FormSelect
                  label="Preferred Study Style"
                  name="studyStyle"
                  value={formData.studyStyle}
                  onChange={handleChange}
                  options={STUDY_STYLES}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Generating...' : <> <SparklesIcon className="w-5 h-5 mr-2" /> Generate My Plan </>}
                </button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-2">
            {isLoading && <Loader />}
            {error && (
              <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg" role="alert">
                <strong className="font-bold">Oops! </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {studyPlan && <PlanDisplay plan={studyPlan} />}
            {!isLoading && !studyPlan && !error && (
              <div className="flex flex-col items-center justify-center text-center bg-white dark:bg-slate-800/50 p-10 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 h-full">
                <SparklesIcon className="w-16 h-16 text-indigo-400 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Ready to Ace Your Exam?</h3>
                <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-md">
                  Your personalized, AI-generated study plan will appear here. Fill out the form to get started!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;