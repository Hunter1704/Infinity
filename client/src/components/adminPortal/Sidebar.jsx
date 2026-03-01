import React from 'react';
import { NavLink } from 'react-router';
import { LayoutDashboard, ListTodo, Users, Video } from 'lucide-react';
import { InfinityLogo } from "../"

const NavItem = ({ to, icon, label }) => {
  const baseClasses = "flex items-center space-x-3 px-4 py-3 transition-all duration-200 rounded-xl";
  const inactiveClasses =
    "text-slate-500 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white";
  const activeClasses =
    "bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-cyan-500/10 dark:from-indigo-500/15 dark:via-violet-500/15 dark:to-cyan-500/15 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-200/50 dark:border-indigo-500/20";

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span className="flex-1">{label}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  const navItems = [
    { to: "/admin-portal", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/admin-portal/problems", icon: <ListTodo size={20} />, label: "Problems" },
    { to: "/admin-portal/users", icon: <Users size={20} />, label: "Users" },
    { to: "/admin-portal/video-solutions", icon: <Video size={20} />, label: "Video Solutions" }
  ];

  return (
    <aside className="w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl flex-shrink-0 flex flex-col border-r border-slate-200/60 dark:border-slate-800/60">
      <div className="h-16 flex items-center border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center space-x-2 px-4">
          <InfinityLogo size={7} className="" />
          <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 dark:from-indigo-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">Infinity</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1.5">
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>
      <div className="p-4 border-t border-slate-200/60 dark:border-slate-800/60">
        <p className="text-xs text-center text-slate-400 dark:text-slate-500">© {new Date().getFullYear()} Infinity Admin</p>
      </div>
    </aside>
  );
};

export default Sidebar;
