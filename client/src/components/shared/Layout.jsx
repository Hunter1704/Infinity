import { Link, NavLink, Outlet } from "react-router";
import InfinityLogo from "./InfinityLogo";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const navLinkClass = ({ isActive }) =>
  [
    "px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200",
    "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/80",
    "dark:text-slate-300 dark:hover:text-indigo-400 dark:hover:bg-indigo-500/10",
    isActive ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" : "",
  ].join(" ");

export default function Layout({ darkTheme, handleThemeChange }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl transition-all duration-300">
        {/* Top gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3.5 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 min-w-0 group">
            <InfinityLogo size={7} />
            <span className="truncate font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 dark:from-indigo-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Infinity
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {/* <NavLink to="/courses" className={navLinkClass}>
              Courses
            </NavLink> */}
            <NavLink to="/leaderboard" className={navLinkClass}>
              Leaderboard
            </NavLink>
            <NavLink to="/contests" className={navLinkClass}>
              Contests
            </NavLink>
            <NavLink to="/my-sprints" className={navLinkClass}>
              My Sprints
            </NavLink>
            <NavLink to="/my-problems/all" className={navLinkClass}>
              My Problems
            </NavLink>

            <button
              type="button"
              onClick={handleThemeChange}
              className="
                ml-2
                p-2.5 rounded-xl text-sm font-semibold
                border border-slate-200/60 hover:border-indigo-200
                bg-white hover:bg-indigo-50/50
                text-slate-500 hover:text-indigo-600
                dark:border-slate-700/60 dark:hover:border-indigo-700
                dark:bg-slate-800/50 dark:hover:bg-indigo-500/10
                dark:text-slate-400 dark:hover:text-indigo-400
                transition-all duration-200
              "
              aria-label="Toggle theme"
            >
              {darkTheme ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-7 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-between gap-4">
          <span className="font-medium">&copy; {new Date().getFullYear()} Infinity</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              Privacy
            </Link>
            <Link to="/about-us" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              About
            </Link>
            <Link to="/contact-us" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
