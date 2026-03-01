import React from "react";

const SocialButton = ({
  providerName,
  icon,
  onClick,
  className,
  action = "Continue",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group relative w-full inline-flex items-center justify-center gap-2.5
        py-3 px-4 rounded-xl
        text-sm font-medium
        border transition-all duration-300
        backdrop-blur-sm
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50
        focus:ring-offset-white dark:focus:ring-offset-slate-900
        
        bg-white/80 dark:bg-slate-800/60
        border-slate-200 dark:border-slate-700
        text-slate-700 dark:text-slate-200
        
        hover:bg-slate-50 dark:hover:bg-slate-700/60
        hover:border-slate-300 dark:hover:border-slate-600
        hover:shadow-lg hover:-translate-y-[1px]
        active:translate-y-0 active:shadow-sm
        
        ${className || ""}
      `}
    >
      <span className="flex items-center justify-center h-5 w-5 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>

      <span className="tracking-wide">
        {`${action} with ${providerName}`}
      </span>
    </button>
  );
};

export default SocialButton;