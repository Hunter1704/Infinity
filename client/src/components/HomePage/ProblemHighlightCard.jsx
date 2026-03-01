import { NavLink } from "react-router";

const ProblemHighlightCard = ({
  title,
  description,
  problemsCount,
  borderColor = "border-t-indigo-500",
  textColor = "text-indigo-600 dark:text-indigo-400",
  bgColor = "bg-indigo-50 dark:bg-indigo-500/10",
  iconColor = "text-indigo-500",
}) => (
  <div
    className={`
      group relative
      rounded-3xl
      border border-slate-200/50 dark:border-slate-800/60
      bg-white/70 dark:bg-slate-900/50
      backdrop-blur-xl
      p-8
      transition-all duration-300
      hover:-translate-y-2
      shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]
      hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
      border-t-4
      ${borderColor}
    `}
  >
    {/* Content */}
    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
      {title}
    </h3>

    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8 min-h-[60px]">
      {description}
    </p>

    <div className="flex justify-between items-center mb-8 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
      <span className="text-xs uppercase font-semibold tracking-wider text-slate-500 dark:text-slate-400">
        Problems Available
      </span>

      <span className={`text-xl font-extrabold ${textColor}`}>{problemsCount}+</span>
    </div>

    <NavLink
      to="/problems"
      className={`
        block w-full text-center
        px-4 py-3
        rounded-xl
        text-sm font-semibold
        ${textColor}
        ${bgColor}
        hover:brightness-95 dark:hover:brightness-125
        transition-all duration-200
      `}
    >
      Explore Problems
    </NavLink>
  </div>
);

export default ProblemHighlightCard;