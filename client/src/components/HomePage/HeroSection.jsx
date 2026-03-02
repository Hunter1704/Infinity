import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-300">

      {/* Background Gradient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-500/10 via-violet-500/5 to-transparent blur-[100px] rounded-full dark:from-indigo-500/20 dark:via-violet-500/10 opacity-70"></div>
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                className="text-slate-900 dark:text-white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 md:py-40 text-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 text-sm font-medium text-indigo-800 dark:text-indigo-300 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
          The Ultimate Coding Arena
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white"
        >
          Master DSA.
          <br />
          <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
            Code Without Limits.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          Infinity is your ultimate coding arena. Solve real interview-level
          problems, track your progress, and compete with developers worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
        >
          <NavLink to="/problems">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 text-white font-semibold text-lg shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transition-all duration-300"
            >
              Start Solving →
            </motion.button>
          </NavLink>

          <NavLink to="/problems">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              View Dashboard
            </motion.button>
          </NavLink>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;