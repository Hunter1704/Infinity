import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { courses } from '../utils/constants';
import CourseCard from '../components/coursePage/CourseCard';
import { BookOpenIcon, InformationCircleIcon } from '../components/Icons/CoursesPageIcons';

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' ||
      (filterType === 'free' && course.isFree) ||
      (filterType === 'paid' && !course.isFree);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen py-16 md:py-24
                    bg-slate-50 dark:bg-[#0B0F19]
                    transition-colors duration-300 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-[500px] pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-indigo-500/10 via-violet-500/5 to-transparent blur-[120px] rounded-full dark:from-indigo-500/15 dark:via-violet-500/10 opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center justify-center 
                            w-20 h-20 rounded-3xl
                            bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-500/10 dark:to-violet-500/10
                            shadow-sm
                            mb-6"
          >
            <BookOpenIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight 
                         text-slate-900 dark:text-white"
          >
            Infinity Courses
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Master data structures, algorithms, system design, and more —
            structured for serious developers.
          </motion.p>
        </header>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12 p-4 sm:p-6 rounded-3xl
                        bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl
                        border border-slate-200/50 dark:border-slate-800/60
                        shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]
                        flex flex-col md:flex-row items-stretch md:items-center gap-4 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all"
        >

          {/* Search */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11
                         bg-slate-50 dark:bg-slate-800/50
                         text-slate-900 dark:text-white
                         placeholder-slate-400 dark:placeholder-slate-500
                         border border-slate-200 dark:border-slate-700
                         rounded-2xl py-3 px-4
                         focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800
                         transition-colors shadow-sm"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {(['all', 'free', 'paid']).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300
                  ${filterType === type
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 rounded-3xl
                          bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl
                          border border-slate-200/50 dark:border-slate-800/60
                          shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >

            <InformationCircleIcon className="w-16 h-16 mx-auto text-indigo-500 mb-6" />

            <h3 className="text-2xl font-bold 
                           text-slate-900 dark:text-white mb-3">
              No courses found
            </h3>

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              We couldn't find any courses matching "<span className="font-semibold text-slate-900 dark:text-white">{searchTerm}</span>" in{" "}
              <span className="font-semibold text-slate-900 dark:text-white">{filterType}</span>.
            </p>

            <p className="text-sm text-slate-500 dark:text-slate-500 mt-4">
              Try adjusting your search or resetting filters.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;