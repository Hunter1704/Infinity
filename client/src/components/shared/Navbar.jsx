import { useState, useEffect, useRef } from 'react';
import { InfinityLogo } from "../../components"
import { Link, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { getRoutes } from '../../utils/helperFunctions';
import { profileDropdownSection, defaultProfileImageUrl } from '../../utils/constants';

const Navbar = ({ darkTheme, handleThemeChange }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.authSlice);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarButtonRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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


  const navLinks = [
    { name: 'Problems', href: '/problems' },
    { name: 'Contests', href: '/contests' },
    { name: 'Leaderboard', href: '/leaderboard' },

    { name: 'Courses', href: '/courses' },
    {name:'Premium Plans' ,href:'/premium-plans'}
  ];

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm dark:shadow-xl border-b border-slate-200/60 dark:border-slate-800/60 fixed w-full z-50 top-0 transition-all duration-300">
      {/* Top gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center group" aria-label="Infinity Home">
            <InfinityLogo size={7} className="" />
            <span className="font-extrabold text-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 dark:from-indigo-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent ml-3 tracking-tight">Infinity</span>
          </Link>
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            {!darkTheme &&
              <button onClick={handleThemeChange} className='p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-all duration-200'>
                <Moon size={18} />
              </button>
            }
            {darkTheme &&
              <button onClick={handleThemeChange} className='p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-all duration-200'>
                <Sun size={18} />
              </button>
            }
            {
              isAuthenticated ? (
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
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-white dark:ring-slate-800 shadow-sm"
                      src={user.profileImageUrl || defaultProfileImageUrl}
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
                        className="top-12 right-0 absolute mt-2 w-52 rounded-2xl shadow-xl py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-700/50 border border-white/20 dark:border-slate-700/30 focus:outline-none z-50"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                      >
                        {profileDropdownSection.map(({ label, key }) =>
                          <button
                            key={key}
                            onClick={() => handleProfileItemClick(key)}
                            className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg mx-0"
                            role="menuitem"
                          >
                            {label}
                          </button>
                        )}
                        {user?.role === 'admin' &&
                          <button
                            key={"adminPortal"}
                            onClick={() => navigate("/admin-portal")}
                            className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg"
                            role="menuitem"
                          >
                            Admin Portal
                          </button>
                        }
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
              ) : (
                <>
                  <button onClick={() => { navigate("/login") }}
                    className="text-slate-600 dark:text-slate-300 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                  >
                    Log In
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { navigate("/signup") }}
                    className="text-white bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)]"
                  >
                    Sign Up
                  </motion.button>
                </>
              )
            }

          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-800/60"
            id="mobile-menu"
          >
            <div className="px-4 pt-3 pb-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="pt-4 pb-4 border-t border-slate-200/60 dark:border-slate-800/60">
              <div className="flex flex-col space-y-3 px-4">
                {
                  isAuthenticated ? (
                    <button onClick={() => { navigate("/logout") }} className="w-full text-left text-slate-600 dark:text-slate-300 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200">
                      Log Out
                    </button>
                  ) : (
                    <>
                      <button onClick={() => { navigate("/login") }} className="w-full text-left text-slate-600 dark:text-slate-300 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200">
                        Log In
                      </button>
                      <button onClick={() => { navigate("/signup") }} className="w-full text-left text-white bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-[0_4px_15px_rgba(99,102,241,0.3)]">
                        Sign Up
                      </button>
                    </>
                  )
                }
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;