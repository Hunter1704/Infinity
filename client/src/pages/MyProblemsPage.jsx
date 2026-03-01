import React, { useState, useMemo, useEffect } from 'react';

import ProblemTable from '../components/myProblemPage/ProblemTable';
import ProblemGrid from '../components/myProblemPage/ProblemGrid';
import { Heart, Star, CheckCircle2, Pencil, ListTodo, LayoutGrid, List } from 'lucide-react';
import axiosClient from '../config/axios';
import LoadingPage from './LoadingPage';
import { useNavigate, useParams } from 'react-router';
import { getMappedProblems } from '../utils/helperFunctions';
import { motion, AnimatePresence } from 'framer-motion';

const MyProblemsPage = () => {
  const { activeTab } = useParams(); // 'all' | 'liked' | 'favorites' | 'solved' | 'attempted'
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState(null);
  const [view, setView] = useState('table'); // 'table' | 'grid'

  useEffect(() => {
    const fetchMyProblems = async () => {
      try {
        const { data } = await axiosClient.get("/problems/user");
        const mappedProblems = getMappedProblems(data);

        setProblems(mappedProblems);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }

    }
    fetchMyProblems();
  }, []);

  const filteredProblems = useMemo(() => {
    if (!problems) return null;

    switch (activeTab) {
      case 'liked':
        return problems.filter(p => p.isLiked);
      case 'favorites':
        return problems.filter(p => p.isFavourited);
      case 'solved':
        return problems.filter(p => p.status === "Solved");
      case 'attempted':
        return problems.filter(p => p.status === "Attempted");
      case 'all':
      default:
        return problems;
    }
  }, [activeTab, problems]);

  const TabButton = ({ tabName, label, icon }) => {
    const isActive = activeTab === tabName;
    return (
      <button
        onClick={() => navigate(`/my-problems/${tabName}`)}
        className={`relative px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center space-x-2.5 overflow-hidden ${isActive
            ? 'text-white shadow-md'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50'
          }`}
      >
        {isActive && (
          <motion.div
            layoutId="activeTabIndicator"
            className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        <span className={`relative z-10 flex items-center gap-2 ${isActive ? 'text-white' : ''}`}>
          {icon}
          <span>{label}</span>
        </span>
      </button>
    );
  };

  const ViewSwitcher = () => (
    <div className="p-1 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl flex items-center space-x-1 shadow-sm">
      <button
        aria-label="Table view"
        onClick={() => setView('table')}
        className={`p-2.5 rounded-lg transition-all duration-200 ${view === 'table'
            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
      >
        <List size={18} />
      </button>
      <button
        aria-label="Grid view"
        onClick={() => setView('grid')}
        className={`p-2.5 rounded-lg transition-all duration-200 ${view === 'grid'
            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
      >
        <LayoutGrid size={18} />
      </button>
    </div>
  );

  if (loading || !problems) return <LoadingPage />

  return (
    <div
      className="
        min-h-screen
        bg-slate-50 dark:bg-[#0B0F19]
        transition-colors duration-300
        relative overflow-hidden
      "
    >
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent blur-[120px] rounded-full dark:from-indigo-500/10 dark:via-violet-500/5 opacity-60"></div>
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 to-indigo-500/5 blur-[100px] rounded-full opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-20 pb-24 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6">
            <ListTodo size={16} />
            <span>Problem Workspace</span>
          </div>
          <h1 className="
            text-4xl md:text-5xl font-extrabold
            text-slate-900 dark:text-white
            tracking-tight
          ">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500">Problems</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl font-medium">
            Track your coding journey, revisit challenges, and level up your problem-solving skills with your personalized lists.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >

          {/* Tabs */}
          <div className="
            backdrop-blur-xl
            bg-white/70 dark:bg-slate-900/50
            border border-slate-200/50 dark:border-slate-800/60
            rounded-2xl p-2
            flex items-center flex-wrap gap-2
            shadow-sm w-full sm:w-auto overflow-x-auto
          ">
            <TabButton tabName="all" label="All" icon={<ListTodo size={18} />} />
            <TabButton tabName="solved" label="Solved" icon={<CheckCircle2 size={18} />} />
            <TabButton tabName="attempted" label="Attempted" icon={<Pencil size={18} />} />
            <TabButton tabName="favorites" label="Favorites" icon={<Star size={18} />} />
            <TabButton tabName="liked" label="Liked" icon={<Heart size={18} />} />
          </div>

          {/* View Switch */}
          <div className="
            backdrop-blur-xl
            bg-white/70 dark:bg-slate-900/50
            border border-slate-200/50 dark:border-slate-800/60
            rounded-2xl p-2 shadow-sm
            self-end sm:self-auto
          ">
            <ViewSwitcher />
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${view}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {view === 'grid' ? (
              <div className="transition-all duration-300">
                <ProblemGrid problems={filteredProblems} />
              </div>
            ) : (
              <div
                className="
                  backdrop-blur-xl
                  bg-white/70 dark:bg-slate-900/50
                  border border-slate-200/50 dark:border-slate-800/60
                  rounded-3xl
                  overflow-hidden
                  shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]
                  transition-all duration-300
                "
              >
                <ProblemTable problems={filteredProblems} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyProblemsPage;
