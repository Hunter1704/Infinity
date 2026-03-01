import React from "react";

const InfinityLogo = ({ size = 8, className = "" }) => {
  const baseHeight = 40;
  const textBaseSize = 24;

  const scale = size / 8;
  const height = baseHeight * scale;
  const fontSize = textBaseSize * scale;

  return (
    <div
      className={`flex items-center font-semibold tracking-tight select-none group ${className}`}
      style={{ height }}
    >
      {/* Left Bracket */}
      <span
        className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-400 transition-all duration-300"
        style={{ fontSize }}
      >
        {"<"}
      </span>

      {/* Infinity Text */}
      <span
        className="mx-1.5 font-extrabold bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300"
        style={{ fontSize }}
      >
        ∞
      </span>

      {/* Slash */}
      <span
        className="text-slate-400 dark:text-slate-500 group-hover:text-violet-400 transition-all duration-300"
        style={{ fontSize }}
      >
        {" /"}
      </span>

      {/* Right Bracket */}
      <span
        className="text-slate-400 dark:text-slate-500 group-hover:text-cyan-400 transition-all duration-300"
        style={{ fontSize }}
      >
        {">"}
      </span>
    </div>
  );
};

export default InfinityLogo;