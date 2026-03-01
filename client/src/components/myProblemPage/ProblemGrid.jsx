import React from 'react';
import ProblemCard from './ProblemCard';

const ProblemsGrid = ({ problems }) => {
    if (problems.length === 0) {
        return (
          <div
            className="
              backdrop-blur-xl
              bg-white/70 dark:bg-slate-900/60
              border border-slate-200/60 dark:border-slate-700/60
              rounded-2xl
              py-28
              flex flex-col items-center justify-center
              text-center
            "
          >
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6">
              <span className="text-2xl">📂</span>
            </div>
      
            <p className="text-2xl font-semibold text-slate-800 dark:text-white">
              No Problems Found
            </p>
      
            <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-sm">
              It looks empty here. Try switching filters or explore more challenges.
            </p>
          </div>
        );
      }
      
      return (
        <div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-8
            transition-all duration-300
          "
        >
          {problems.map((problem) => (
            <ProblemCard
              key={problem._id}
              problem={problem}
            />
          ))}
        </div>
      );
};

export default ProblemsGrid;
