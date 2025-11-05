
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Header: React.FC = () => (
  <header className="bg-white dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 shadow-sm">
    <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <SparklesIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">AI Exam Planner</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Your Personal Guide for Indian Entrance Exams</p>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
