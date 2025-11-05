
import React from 'react';

const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center bg-white dark:bg-slate-800/50 p-10 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Crafting Your Plan...</h3>
    <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-md">
      Our AI is analyzing syllabi and strategies to build your perfect roadmap. This might take a moment.
    </p>
  </div>
);

export default Loader;
