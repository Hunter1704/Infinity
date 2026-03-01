import React from 'react';
import { Link } from 'react-router';
import { APP_ROUTES } from '../../utils/constants';
import {
  StarIcon,
  AcademicCapIcon,
  LevelEasyIcon,
  LevelIntermediateIcon,
  LevelAdvancedIcon
} from '../Icons/CoursesPageIcons';

const DifficultyIcon = ({ difficulty }) => {
  switch (difficulty) {
    case "Beginner":
      return <LevelEasyIcon className="w-4 h-4 text-emerald-500" />;
    case "Intermediate":
      return <LevelIntermediateIcon className="w-4 h-4 text-amber-500" />;
    case "Advanced":
    case "Expert":
      return <LevelAdvancedIcon className="w-4 h-4 text-rose-500" />;
    default:
      return null;
  }
};

const CourseCard = ({ course }) => {
  const courseUrl = APP_ROUTES.courseOverview.replace(':courseId', course.id);

  return (
    <Link
      to={courseUrl}
      className="group relative block rounded-3xl overflow-hidden
                 bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl
                 border border-slate-200/50 dark:border-slate-800/60
                 hover:border-indigo-500/30 dark:hover:border-indigo-500/30
                 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]
                 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
                 transition-all duration-300 hover:-translate-y-2 z-10"
    >
      {/* Gradient Hover Glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none"></div>

      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10"></div>
        <img
          src={course.url}
          alt={course.title}
          className="w-full h-52 object-cover
                     transition-transform duration-700 ease-out
                     group-hover:scale-110"
        />

        {/* Price / Free Badge */}
        <span
          className={`absolute top-4 right-4 z-20 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md
            ${course.isFree
              ? 'bg-emerald-500 text-white'
              : 'bg-indigo-500 text-white'
            }`}
        >
          {course.isFree ? "FREE" : `$${course.price.toFixed(2)}`}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 relative z-20 flex flex-col h-full">

        {/* Category + Rating */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
            {course.category[0]}
          </span>

          {course.rating && (
            <div className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-700/50">
              <StarIcon className="w-4 h-4 text-amber-400 mr-1.5" />
              {course.rating.toFixed(1)}
            </div>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-xl font-bold
                     text-slate-900 dark:text-white
                     group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                     transition-colors duration-300
                     line-clamp-2 tracking-tight"
        >
          {course.title}
        </h3>

        {/* Tagline */}
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed flex-grow">
          {course.tagline}
        </p>

        {/* Footer */}
        <div
          className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/50
                     flex items-center justify-between text-xs font-semibold"
        >
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <DifficultyIcon difficulty={course.difficulty} />
            <span>{course.difficulty}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-2.5 py-1 rounded-lg">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {course.itemCount} lessons
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;