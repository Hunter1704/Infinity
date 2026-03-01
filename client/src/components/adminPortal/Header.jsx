import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router';
import { useSelector } from 'react-redux';
import { ChevronDown, Bell } from 'lucide-react';
import { Sun, Moon, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileDropdownSection } from '../../utils/constants';
import { getRoutes } from '../../utils/helperFunctions';

const Header = ({ darkTheme, handleThemeChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.authSlice);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarButtonRef = useRef(null);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(prev => !prev);
  };

  const handleProfileItemClick = (action) => {
    navigate(getRoutes(action));
    setIsProfileDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarButtonRef.current &&
        !avatarButtonRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Admin Dashboard';
      case '/problems':
        return 'Problem Management';
      case '/create-problem':
        return 'Create New Problem';
      case '/users':
        return 'User Management';
      case '/create-user':
        return 'Create New User';
      default:
        if (location.pathname.startsWith('/problems/edit')) return 'Edit Problem';
        if (location.pathname.startsWith('/users/edit')) return 'Edit User';
        return 'Admin Portal';
    }
  };

  return (
    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl flex-shrink-0 flex items-center justify-between px-8 border-b border-slate-200/60 dark:border-slate-800/60">
      <h1 className="text-xl font-bold text-slate-900 dark:text-white">{getTitle()}</h1>
      <div className="flex items-center space-x-3">
        <NavLink to="/">
          <button
            className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-200"
            aria-label="Go home"
          >
            <Home size={18} />
          </button>
        </NavLink>
        <button
          onClick={handleThemeChange}
          className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-200"
          aria-label="Toggle theme"
        >
          {darkTheme ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200">
          <Bell size={18} className="text-slate-500 dark:text-slate-400" />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900"></span>
        </button>

        <div className="relative">
          {/* Profile Avatar and Dropdown */}
          <button
            ref={avatarButtonRef}
            onClick={toggleProfileDropdown}
            className="flex items-center p-1 rounded-full hover:ring-2 hover:ring-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 transition-all duration-200"
            aria-label="Open user menu"
            aria-haspopup="true"
            aria-expanded={isProfileDropdownOpen}
          >
            <img
              className="h-8 w-8 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
              src={user.profileImageUrl || "https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg"}
              alt="User avatar"
            />
            <ChevronDown className={`h-4 w-4 ml-1 text-slate-400 dark:text-slate-500 transform transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {isProfileDropdownOpen && (
              <motion.div
                key="profileDropdown"
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-12 right-3 mt-2 w-52 rounded-2xl shadow-xl py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-700/50 border border-white/20 dark:border-slate-700/30 focus:outline-none z-50"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                {profileDropdownSection.map(({ label, key }) =>
                  <button
                    key={key}
                    onClick={() => handleProfileItemClick(key)}
                    className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg"
                    role="menuitem"
                  >
                    {label}
                  </button>
                )}
                <button
                  key={"adminPortal"}
                  onClick={() => navigate("/admin-portal")}
                  className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg"
                  role="menuitem"
                >
                  Admin Portal
                </button>
                <div key="divider" className="border-t border-slate-200/60 dark:border-slate-700/60 my-1.5 mx-3" />
                <button
                  key={'logout'}
                  onClick={() => handleProfileItemClick('logout')}
                  className="block w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors rounded-lg"
                  role="menuitem"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
