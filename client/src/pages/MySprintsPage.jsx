import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SprintCard } from '../components';
import axiosClient from '../config/axios';
import LoadingPage from './LoadingPage';
import { Outlet, useParams } from 'react-router';
import { mapSprints } from '../utils/helperFunctions';

const MySprintsPage = () => {
  const [sprints, setSprints] = useState(null);
  const [loading, setLoading] = useState(true);
  const { sprintName } = useParams();

  useEffect(() => {
    const fetchSprints = async () => {
      try {

        const { data } = await axiosClient.get("/profile/my-sprints");
        const mappedSprints = mapSprints(data.bookmarks, data.checkedProblems);
        setSprints(mappedSprints);
        setLoading(false);

      } catch (error) {
        console.log(error);
      }
    }
    fetchSprints();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading || !sprints) return <LoadingPage />;

  if (!sprintName)
    return (
      <div
        className="
          min-h-screen
          bg-slate-50 dark:bg-[#0B0F19]
          transition-colors duration-300 relative overflow-hidden
        "
      >
        {/* Background Decor */}
        <div className="absolute top-0 inset-x-0 h-[600px] pointer-events-none">
          <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent blur-[120px] rounded-full dark:from-indigo-500/15 dark:via-violet-500/10 opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16 text-center md:text-left">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="
                  text-4xl md:text-5xl lg:text-6xl font-extrabold
                  bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500
                  bg-clip-text text-transparent tracking-tight mb-4
                "
              >
                My Sprints
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto md:mx-0"
              >
                Organize your bookmarked challenges into structured collections.
                Track progress, stay consistent, and build mastery.
              </motion.p>
            </div>

          </div>

          {/* Content */}
          {sprints.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {sprints.map((sprint) => (
                <motion.div
                  key={sprint.createdAt}
                  variants={itemVariants}
                >
                  <SprintCard sprint={sprint} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="
                backdrop-blur-xl
                bg-white/70 dark:bg-slate-900/50
                border border-slate-200/50 dark:border-slate-800/60
                rounded-3xl
                py-20
                text-center
                shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]
              "
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-50 dark:bg-indigo-500/10 mb-6">
                <svg className="w-10 h-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                No Sprints Yet
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                You haven’t created any sprints yet.
              </p>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-500">
                Start organizing your learning journey today by bookmarking problems into sprints.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    );

  return <Outlet context={{ sprints }} />;
};

export default MySprintsPage;
