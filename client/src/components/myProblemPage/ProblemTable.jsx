import React from 'react';
import { Heart, Star } from 'lucide-react';
import Icon from '../shared/Icon';
import { NavLink } from 'react-router';

const ProblemsTable = ({ problems }) => {
  const difficultyStyles = {
    Easy: 'bg-green-500/10 text-green-400',
    Medium: 'bg-yellow-500/10 text-yellow-400',
    Hard: 'bg-red-500/10 text-red-400',
  };

  const ActionButton = ({ isToggled, icon, toggledClasses, ariaLabel }) => (
    <button
      aria-label={ariaLabel}
      className={`p-1.5 rounded-full transition-colors duration-200 ${
        isToggled
          ? toggledClasses
          : 'text-slate-500'
      }`}
    >
      {icon}
    </button>
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Solved':
        return (
          <Icon
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            pathProps={{ fillRule: "evenodd", clipRule: "evenodd" }}
            className="w-5 h-5 text-green-600 dark:text-green-500"
            viewBox="0 0 20 20"
            isOutline={false}
            svgProps={{ "aria-label": "Solved" }}
          />
        );
      case 'Attempted':
        return (
          <Icon
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
            pathProps={{ fillRule: "evenodd", clipRule: "evenodd" }}
            className="w-5 h-5 text-yellow-600 dark:text-yellow-500"
            viewBox="0 0 20 20"
            isOutline={false}
            svgProps={{ "aria-label": "Attempted" }}
          />
        );
      case 'Todo':
      default:
        return (
          <Icon
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-4-8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"
            pathProps={{ fillRule: "evenodd", clipRule: "evenodd" }}
            className="w-5 h-5 text-slate-400 dark:text-gray-500"
            viewBox="0 0 20 20"
            isOutline={false}
            svgProps={{ "aria-label": "To Do" }}
          />
        );
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60">
      <table className="w-full text-sm text-slate-600 dark:text-slate-400">
        
        {/* Header */}
        <thead className="text-xs uppercase tracking-wider bg-slate-50/70 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400">
          <tr>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Title</th>
            <th className="px-6 py-4 text-left">Difficulty</th>
            <th className="px-6 py-4 text-left">Tags</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
  
        {/* Body */}
        <tbody>
          {problems.map((problem) => (
            <tr
              key={problem._id}
              className="
                border-t border-slate-200/60 dark:border-slate-700/60
                hover:bg-orange-50/40 dark:hover:bg-orange-500/5
                transition-colors duration-200
              "
            >
              {/* Status */}
              <td className="px-6 py-4" title={problem.status || 'To Do'}>
                {getStatusIcon(problem.status)}
              </td>
  
              {/* Title */}
              <th
                scope="row"
                className="px-6 py-4 font-semibold text-slate-800 dark:text-white whitespace-nowrap"
              >
                <NavLink
                  to={`/problems/${problem._id}`}
                  className="hover:text-orange-500 transition-colors"
                >
                  {problem.title}
                </NavLink>
              </th>
  
              {/* Difficulty */}
              <td className="px-6 py-4">
                <span
                  className={`
                    px-3 py-1 text-xs font-semibold rounded-full
                    border backdrop-blur-sm
                    ${difficultyStyles[problem.difficulty]}
                  `}
                >
                  {problem.difficulty}
                </span>
              </td>
  
              {/* Tags */}
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        bg-slate-100 dark:bg-slate-800
                        text-slate-600 dark:text-slate-300
                        px-2.5 py-0.5 text-xs
                        rounded-md
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
  
              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <ActionButton
                    isToggled={problem.isLiked}
                    icon={
                      <Heart
                        size={16}
                        fill={problem.isLiked ? 'currentColor' : 'none'}
                      />
                    }
                    toggledClasses="text-pink-500 bg-pink-500/10"
                    ariaLabel="Like problem"
                  />
                  <ActionButton
                    isToggled={problem.isFavourited}
                    icon={
                      <Star
                        size={16}
                        fill={problem.isFavourited ? 'currentColor' : 'none'}
                      />
                    }
                    toggledClasses="text-amber-400 bg-amber-400/10"
                    ariaLabel="Favorite problem"
                  />
                </div>
              </td>
            </tr>
          ))}
  
          {problems.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="text-center py-16 text-slate-500 dark:text-slate-400"
              >
                No problems match the current filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemsTable;
