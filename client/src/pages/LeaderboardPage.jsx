import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Crown,
  Trophy
} from 'lucide-react';
import { PODIUM_COLORS, DIFFICULTY_COLORS } from '../utils/constants';

import LoadingPage from './LoadingPage';
import axiosClient from '../config/axios';

import { mapUserProfile as mapUserInfo } from '../utils/helperFunctions';
import { generateMappedLeaderboard } from '../utils/helperFunctions';

const ProblemDifficulty = {
  Easy: 'Easy',
  Medium: 'Medium',
  Hard: 'Hard',
};

const USERS_PER_PAGE = 10;

let myProfile = {};
let totalPages;

const LeaderboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeaderboardUser, setSelectedLeaderboardUser] = useState(null);
  const [previewDifficultyFilter, setPreviewDifficultyFilter] = useState('All');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const [leaderboardData, usersCountData] = await Promise.all([
          axiosClient.get("/profile/leaderboard"),
          axiosClient.get("/profile/users-count")
        ]);

        totalPages = Math.ceil(usersCountData.data.totalUsers / USERS_PER_PAGE);
        myProfile = leaderboardData.data.user;
        myProfile.profileImageUrl =
          myProfile.profileImageUrl ||
          "https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg";

        const mapped = generateMappedLeaderboard(
          leaderboardData.data.leaderboard,
          currentPage
        );

        setSelectedLeaderboardUser(mapUserInfo(myProfile));
        setLeaderboard(mapped);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLeaderboardData();
  }, []);

  const filteredPreviewProblems = useMemo(() => {
    if (!selectedLeaderboardUser) return [];

    const filteredProblems = [];
    const difficulty = previewDifficultyFilter;

    for (const problem of selectedLeaderboardUser.checkedProblems) {
      if (problem.isSolved) {
        if (difficulty === 'All') filteredProblems.push(problem);
        else if (difficulty === problem.pid.difficulty)
          filteredProblems.push(problem);
      }
    }

    return filteredProblems;
  }, [previewDifficultyFilter, selectedLeaderboardUser]);

  const handleNextPageButton = async () => {
    if (currentPage + 1 > totalPages) return;

    try {
      const { data } = await axiosClient.get(
        `/profile/leaderboard?page=${currentPage + 1}`
      );
      const mapped = generateMappedLeaderboard(
        data.leaderboard,
        currentPage + 1
      );
      setCurrentPage(currentPage + 1);
      setLeaderboard(mapped);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreviousPageButton = async () => {
    if (currentPage - 1 < 1) return;

    try {
      const { data } = await axiosClient.get(
        `/profile/leaderboard?page=${currentPage - 1}`
      );
      const mapped = generateMappedLeaderboard(
        data.leaderboard,
        currentPage - 1
      );
      setCurrentPage(currentPage - 1);
      setLeaderboard(mapped);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserRowClick = async (user) => {
    if (user.id === selectedLeaderboardUser?.id) return;

    if (user.id === myProfile._id) {
      setSelectedLeaderboardUser(mapUserInfo(myProfile));
      return;
    }

    try {
      const { data: userProfile } = await axiosClient.get(
        `/profile/leaderboard/${user.id}`
      );
      userProfile.rank = user.rank;
      setSelectedLeaderboardUser(mapUserInfo(userProfile));
      setPreviewDifficultyFilter('All');
    } catch (error) {
      console.log(error);
    }
  };

  const getPodiumIconAndColor = (rank) => {
    if (rank === 1)
      return {
        icon: <Crown className={`w-5 h-5 mr-1.5 ${PODIUM_COLORS.gold}`} />,
        colorClass: PODIUM_COLORS.gold
      };
    if (rank === 2)
      return {
        icon: <Trophy className={`w-4 h-4 mr-1.5 ${PODIUM_COLORS.silver}`} />,
        colorClass: PODIUM_COLORS.silver
      };
    if (rank === 3)
      return {
        icon: <Trophy className={`w-4 h-4 mr-1.5 ${PODIUM_COLORS.bronze}`} />,
        colorClass: PODIUM_COLORS.bronze
      };

    return { icon: null, colorClass: 'text-slate-700 dark:text-slate-200' };
  };

  const difficultyButtonClasses = (isActive) =>
    `px-3 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all duration-200 ${isActive
      ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md'
      : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200'
    }`;

  if (loading) return <LoadingPage />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-300 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-[600px] pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent blur-[120px] rounded-full dark:from-indigo-500/15 dark:via-violet-500/10 opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-8 lg:px-12 py-16 relative z-10">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center justify-center 
              w-20 h-20 rounded-3xl 
              bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-500/10 dark:to-violet-500/10 
              shadow-sm mb-6"
          >
            <Trophy className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold 
              bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 
              bg-clip-text text-transparent tracking-tight mb-4"
          >
            Global Leaderboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 mt-1 max-w-2xl mx-auto"
          >
            See how you rank among the top Infinity problem solvers.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">

          {/* Leaderboard Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-grow lg:w-2/3"
          >
            <div className="backdrop-blur-xl 
              bg-white/70 dark:bg-slate-900/50 
              border border-slate-200/50 dark:border-slate-800/60 
              shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] 
              rounded-3xl flex flex-col overflow-hidden">

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur sticky top-0 border-b border-slate-200/60 dark:border-slate-700/60">
                    <tr>
                      <th className="px-6 py-4 text-center font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-xs">Rank</th>
                      <th className="px-6 py-4 text-left font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-xs">User</th>
                      <th className="px-6 py-4 text-right font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-xs">Points</th>
                      <th className="px-6 py-4 text-right font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-xs">Solved</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                    {leaderboard.map((user) => {
                      const { icon, colorClass } = getPodiumIconAndColor(user.rank);
                      const isSelected = selectedLeaderboardUser?.id === user.id;

                      return (
                        <tr
                          key={user.id}
                          onClick={() => handleUserRowClick(user)}
                          className={`group cursor-pointer transition-all duration-200 ${isSelected ? 'bg-indigo-50/50 dark:bg-indigo-500/10 hover:bg-indigo-50/80 dark:hover:bg-indigo-500/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
                        >
                          <td className="px-6 py-5 text-center">
                            <div className="flex justify-center items-center">
                              {icon}
                              <span className={`font-bold text-base ${colorClass}`}>
                                #{user.rank}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex items-center">
                              <img
                                src={user.avatarUrl}
                                className="h-10 w-10 rounded-full mr-4 border-2 border-transparent group-hover:border-indigo-200 dark:group-hover:border-indigo-500/50 transition-colors"
                                alt=""
                              />
                              <span className="font-semibold text-slate-800 dark:text-white">
                                {user.username}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-5 text-right">
                            <div className="flex justify-end items-center font-bold text-slate-900 dark:text-slate-100">
                              <Star className="w-4 h-4 mr-1.5 text-amber-400" />
                              {user.codingPoints}
                            </div>
                          </td>

                          <td className="px-6 py-5 text-right font-semibold text-slate-700 dark:text-slate-300">
                            {user.problemsSolved}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center p-5 border-t border-slate-100 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50">
                <button
                  onClick={handlePreviousPageButton}
                  disabled={currentPage === 1}
                  className="flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>

                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={handleNextPageButton}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Profile Preview */}
          {selectedLeaderboardUser && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/3"
            >
              <div className="backdrop-blur-xl 
                bg-white/70 dark:bg-slate-900/50 
                border border-slate-200/50 dark:border-slate-800/60 
                shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] 
                rounded-3xl p-8 sticky top-24">

                <div className="flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={selectedLeaderboardUser.avatarUrl}
                      className="w-24 h-24 rounded-full border-4 border-indigo-500/20 shadow-lg"
                      alt=""
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-white dark:border-slate-900 shadow-sm">
                      #{selectedLeaderboardUser.rank || '-'}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mt-5 text-slate-900 dark:text-white tracking-tight">
                    {selectedLeaderboardUser.username}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2 text-slate-500 dark:text-slate-400 font-medium">
                    <Star className="w-4 h-4 text-amber-400" />
                    {selectedLeaderboardUser.codingPoints || 0} Points
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 text-center">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{selectedLeaderboardUser.problemsSolved || 0}</div>
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Solved</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 text-center">
                    <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">{selectedLeaderboardUser.contestsParticipated || 0}</div>
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Contests</div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;