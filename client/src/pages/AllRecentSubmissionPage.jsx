import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIconMini,
  ExclamationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon
} from '../components/Icons/ProfilePageIcons';
import LoadingPage from './LoadingPage';
import axiosClient from '../config/axios';
import { NavLink } from 'react-router';
import { mapSubmissions } from '../utils/helperFunctions';

let totalPages, totalSubmissions;

const SubmissionStatusIcon = ({ status }) => {
  switch (status) {
    case 'Accepted':
      return <CheckCircleIcon className="w-5 h-5 text-emerald-500" />;
    case 'Wrong Answer':
      return <XCircleIcon className="w-5 h-5 text-red-500" />;
    case 'Time Limit Exceeded':
      return <ClockIconMini className="w-5 h-5 text-yellow-500" />;
    case 'Compilation Error':
      return <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />;
    case 'Runtime Error':
      return <ExclamationCircleIcon className="w-5 h-5 text-purple-500" />;
    case 'Pending':
      return <ClockIconMini className="w-5 h-5 text-indigo-500" />;
    default:
      return null;
  }
};

const AllRecentSubmissionsPage = ({ onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const [submissionsCountDetails, fetchedSubmissions] = await Promise.all([
          axiosClient(`/submissions/totalCount`),
          axiosClient(`/submissions?page=${currentPage}`)
        ]);
        totalSubmissions = submissionsCountDetails.data.totalSubmissions;
        totalPages = Math.ceil(totalSubmissions / 10);

        const mappedSubmissions = mapSubmissions(fetchedSubmissions.data);

        setSubmissions(mappedSubmissions);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchSubmissions();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage - 1 >= 1) {
      setLoading(true);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage + 1 <= totalPages) {
      setLoading(true);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const buttonBaseClasses = 'px-4 py-2 text-sm font-semibold rounded-xl flex items-center transition-colors shadow-sm';
  const enabledButtonClasses = `${buttonBaseClasses} bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700`;
  const disabledButtonClasses = `${buttonBaseClasses} bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50`;

  if (loading && submissions.length === 0) return <LoadingPage />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-300 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-[600px] pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent blur-[120px] rounded-full dark:from-indigo-500/15 dark:via-violet-500/10 opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-8 lg:px-12 py-12 relative z-10 w-full max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center">
            {onBack && (
              <button
                onClick={onBack}
                className="mr-4 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors shadow-sm"
              >
                <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
              >
                All Submissions
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1"
              >
                You have made {totalSubmissions || 0} total submissions.
              </motion.p>
            </div>
          </div>
        </div>

        {submissions.length === 0 && !loading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/60 rounded-3xl py-20 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-50 dark:bg-indigo-500/10 mb-6">
              <svg className="w-10 h-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Submissions Yet</h3>
            <p className="text-slate-500 dark:text-slate-400">Your recent problem submissions will appear here.</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`backdrop-blur-xl bg-white/70 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] overflow-hidden flex flex-col ${loading ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur sticky top-0 border-b border-slate-200/60 dark:border-slate-700/60">
                  <tr>
                    {['Problem', 'Status', 'Language', 'Runtime', 'Memory', 'Date'].map((heading, i) => (
                      <th
                        key={heading}
                        className={`px-6 py-4 font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-xs ${i === 0 ? 'text-left' : 'text-left'}`}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {submissions.map((submission) => (
                    <tr
                      key={submission.id}
                      className="group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-6 py-5">
                        <NavLink
                          to={`/problems/${submission.problemId}`}
                          className="font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1"
                        >
                          {submission.problemName}
                        </NavLink>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-2.5">
                          <SubmissionStatusIcon status={submission.status} />
                          <span
                            className={`text-sm font-bold ${submission.status === 'Accepted'
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : submission.status === 'Wrong Answer'
                                  ? 'text-red-600 dark:text-red-400'
                                  : submission.status === 'Compilation Error'
                                    ? 'text-orange-600 dark:text-orange-400'
                                    : submission.status === 'Time Limit Exceeded'
                                      ? 'text-yellow-600 dark:text-yellow-400'
                                      : submission.status === 'Runtime Error'
                                        ? 'text-purple-600 dark:text-purple-400'
                                        : submission.status === 'Pending'
                                          ? 'text-indigo-600 dark:text-indigo-400'
                                          : 'text-slate-600 dark:text-slate-400'
                              }`}
                          >
                            {submission.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-medium text-slate-600 dark:text-slate-400">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs">{submission.language}</span>
                      </td>
                      <td className="px-6 py-5 font-mono text-slate-700 dark:text-slate-300">{submission.runtime || '-'}</td>
                      <td className="px-6 py-5 font-mono text-slate-700 dark:text-slate-300">{submission.memory || '-'}</td>
                      <td className="px-6 py-5 font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {new Date(submission.date).toLocaleString(undefined, {
                          month: 'short', day: 'numeric', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center p-5 border-t border-slate-100 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1 || loading}
                  className={currentPage === 1 ? disabledButtonClasses : enabledButtonClasses}
                >
                  <ChevronLeftIcon className="w-5 h-5 mr-1.5" /> Previous
                </button>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Page <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> of {totalPages}
                  </span>
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || loading}
                  className={currentPage === totalPages ? disabledButtonClasses : enabledButtonClasses}
                >
                  Next <ChevronRightIcon className="w-5 h-5 ml-1.5" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllRecentSubmissionsPage;
