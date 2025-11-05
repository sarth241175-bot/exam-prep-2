import React from 'react';
import type { StudyPlan, Chapter } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { BrainIcon } from './icons/BrainIcon';
import { QuestionMarkIcon } from './icons/QuestionMarkIcon';

interface PlanDisplayProps {
  plan: StudyPlan;
}

const getWeightageClass = (weightage: string) => {
  switch (weightage.toLowerCase()) {
    case 'high':
      return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
    default:
      return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
  }
};

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Your Personalized Study Plan for <span className="text-indigo-500">{plan.examName}</span></h1>
        <p className="text-slate-600 dark:text-slate-400">Follow this roadmap to success. Stay focused and consistent!</p>
      </header>
      
      <div className="space-y-6">
        {plan.plan.map((cycle, index) => (
          <div key={index} className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">{cycle.cycle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center"><ClipboardIcon className="w-5 h-5 mr-2 text-slate-500" /> Chapters to Cover</h4>
                    <ul className="space-y-2">
                        {cycle.chapters.map((chapter: Chapter, chapIndex: number) => (
                            <li key={chapIndex} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">{chapter.name}</span>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getWeightageClass(chapter.weightage)}`}>
                                        {chapter.weightage}
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-2">
                                    <QuestionMarkIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                                    <span>Practice: {chapter.questionsToPractice}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center"><BrainIcon className="w-5 h-5 mr-2 text-slate-500" /> Revision Strategy</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{cycle.revisionStrategy}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
        
      <div className="bg-indigo-50 dark:bg-indigo-900/50 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-700">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Final Advice from your AI Mentor</h3>
        <p className="text-indigo-800 dark:text-indigo-200">{plan.finalAdvice}</p>
      </div>
    </div>
  );
};

export default PlanDisplay;
