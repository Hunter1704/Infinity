// /components/CourseCard.jsx

import { NavLink } from "react-router";

const CourseCard = ({
  imageUrl,
  title,
  description,
  level,
  duration,
  isFeatured,
  redirect,
}) => (
  <div
    className={`
      group
      relative
      flex-shrink-0 w-[90%] sm:w-[50%] md:w-[40%] lg:w-1/3 snap-center
      rounded-3xl
      overflow-hidden
      border border-slate-200/50 dark:border-slate-800/60
      bg-white/70 dark:bg-slate-900/50
      backdrop-blur-xl
      transition-all duration-300
      hover:-translate-y-2
      shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]
      hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
      ${isFeatured ? "ring-2 ring-indigo-500/40 shadow-indigo-500/10 scale-[1.03] z-10" : "hover:border-indigo-500/30"}
    `}
  >
    {/* Gradient Hover Glow */}
    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none"></div>

    {/* Image */}
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
      <img
        className="h-56 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        src={imageUrl}
        alt={title}
      />

      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-4 left-4 z-20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 text-white shadow-lg overflow-hidden flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          Featured
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-8 flex flex-col flex-grow relative z-20">
      {/* Meta */}
      <div className="flex justify-between items-center mb-4">
        <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
          {level}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {duration}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">
        {description}
      </p>

      {/* CTA */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50">
        <NavLink
          to={redirect}
          className="
            flex items-center justify-center gap-2
            w-full
            px-4 py-3
            rounded-xl
            text-sm font-semibold
            text-white
            bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500
            hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600
            transition-all duration-300
            shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]
          "
        >
          View Course
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </NavLink>
      </div>
    </div>
  </div>
);

export default CourseCard;