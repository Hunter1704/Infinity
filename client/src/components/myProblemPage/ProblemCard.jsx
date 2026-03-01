import React from 'react';
import { Heart, Star, Bookmark } from 'lucide-react';
import { NavLink } from 'react-router';

const ProblemCard = ({ problem }) => {
  const { title, difficulty, isLiked, isFavourited, status } = problem;

  const difficultyStyles = {
    Easy: 'bg-green-500/10 text-green-400 border-green-500/20',
    Medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Hard: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  const ActionButton = ({ isToggled, icon, toggledClasses, ariaLabel }) => (
    <button
      aria-label={ariaLabel}
      className={`p-2 rounded-full transition-colors duration-200 ${
        isToggled
          ? toggledClasses
          : 'text-slate-400'
      }`}
    >
      {icon}
    </button>
  );

  return (
    <div
      className="
        group relative
        backdrop-blur-xl
        bg-white/70 dark:bg-slate-900/60
        border border-slate-200/60 dark:border-slate-700/60
        rounded-2xl p-6
        flex flex-col justify-between
        transition-all duration-300
        hover:-translate-y-2 hover:shadow-2xl
        overflow-hidden
      "
    >
      {/* Soft Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-400/5 pointer-events-none"></div>
  
      <div className="relative z-10">
        {/* Difficulty Badge */}
        <span
          className={`
            inline-flex items-center
            px-3 py-1 text-xs font-semibold rounded-full border
            backdrop-blur-md
            ${difficultyStyles[difficulty]}
          `}
        >
          {difficulty}
        </span>
  
        {/* Title */}
        <h3 className="
          text-lg font-bold mt-4
          text-slate-800 dark:text-white
          group-hover:text-orange-500
          transition-colors
        ">
          {title}
        </h3>
      </div>
  
      {/* Footer */}
      <div className="
        relative z-10
        mt-6 pt-5
        border-t border-slate-200/60 dark:border-slate-700/60
        flex items-center justify-between
      ">
        <NavLink
          to={`/problems/${problem._id}`}
          className="
            text-sm font-semibold
            bg-gradient-to-r from-orange-500 to-amber-400
            bg-clip-text text-transparent
            hover:opacity-80 transition
          "
        >
          Solve Challenge →
        </NavLink>
  
        <div className="flex items-center gap-2">
          <ActionButton
            isToggled={isLiked}
            icon={<Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />}
            toggledClasses="text-pink-500 bg-pink-500/10"
            ariaLabel="Like problem"
          />
          <ActionButton
            isToggled={isFavourited}
            icon={<Star size={20} fill={isFavourited ? 'currentColor' : 'none'} />}
            toggledClasses="text-amber-400 bg-amber-400/10"
            ariaLabel="Favorite problem"
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
