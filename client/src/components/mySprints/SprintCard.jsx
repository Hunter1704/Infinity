import React from 'react';
import { Lock, Unlock } from 'lucide-react';
import { useNavigate } from 'react-router';

const SprintCard = ({ sprint }) => {
  const navigate = useNavigate();

  const difficultyColors = {
    Easy: 'border-l-green-500',
    Medium: 'border-l-yellow-500',
    Hard: 'border-l-red-500',
  };
  return (
    <div
      className="
        group
        backdrop-blur-xl
        bg-white/70 dark:bg-slate-900/60
        border border-slate-200/60 dark:border-slate-700/60
        rounded-3xl
        p-8
        flex flex-col
        shadow-lg
        transition-all duration-300
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
            {sprint.sprintName}
          </h3>
  
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
            {sprint.description}
          </p>
        </div>
  
        <span
          className={`flex-shrink-0 ml-4 flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-full ${
            sprint.isPublic
              ? 'bg-emerald-500/10 text-emerald-500'
              : 'bg-slate-500/10 text-slate-400'
          }`}
        >
          {sprint.isPublic ? <Unlock size={14} /> : <Lock size={14} />}
          <span>{sprint.isPublic ? 'Public' : 'Private'}</span>
        </span>
      </div>
  
      {/* Problems List */}
      <div className="flex-grow space-y-3 mb-8">
        {sprint.problems.map((problem) => (
          <div
            key={problem._id}
            className={`
              bg-slate-50 dark:bg-slate-800/60
              p-3 rounded-xl
              border-l-4
              ${difficultyColors[problem.difficulty]}
              flex justify-between items-center
              transition-all
              group-hover:bg-slate-100
              dark:group-hover:bg-slate-800
            `}
          >
            <span className="font-medium text-sm text-slate-700 dark:text-slate-300 truncate">
              {problem.title}
            </span>
          </div>
        ))}
      </div>
  
      {/* CTA */}
      <button
        onClick={() => navigate(`${sprint.sprintName}`)}
        className="
          w-full
          py-3
          rounded-xl
          font-semibold
          text-white
          bg-gradient-to-r from-orange-500 to-amber-400
          hover:opacity-90
          shadow-md
          transition
        "
      >
        Open Sprint
      </button>
    </div>
  );
};

export default SprintCard;
