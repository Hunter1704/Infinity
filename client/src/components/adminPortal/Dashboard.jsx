import React from 'react';
import { Link, useOutletContext } from 'react-router';
import { PlusSquare, ListTodo, Users, BarChart2, CheckCircle, Clock, XCircle, Video } from 'lucide-react';
import { getProcessedStatus, getTimeStamp } from '../../utils/helperFunctions';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, gradient }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex items-center space-x-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-lg"
  >
    <div className={`${gradient} p-4 rounded-xl text-white shadow-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  </motion.div>
);

const ActionCard = ({ to, title, description, icon }) => (
  <Link
    to={to}
    className="group block bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-lg"
  >
    <div className="flex items-center space-x-4 mb-2">
      <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
    </div>
    <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
  </Link>
);

const RecentSubmissionItem = ({ title, user, status, time }) => (
  <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors duration-200">
    <div className="flex items-center space-x-3">
      {status === 'Accepted' ? (
        <CheckCircle className="text-emerald-500" size={20} />
      ) : (
        <XCircle className="text-red-500" size={20} />
      )}
      <div>
        <p className="font-medium text-slate-900 dark:text-white">{title}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{user}</p>
      </div>
    </div>
    <div className="text-right">
      <p className={`font-semibold text-sm ${status === 'Accepted' ? 'text-emerald-500' : 'text-red-500'}`}>{status}</p>
      <p className="text-xs text-slate-400 dark:text-slate-500">{time}</p>
    </div>
  </div>
);

const Dashboard = () => {

  const { data } = useOutletContext();

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-1 text-slate-900 dark:text-white">Welcome back, Admin!</h2>
        <p className="text-slate-500 dark:text-slate-400">Here's a quick overview of the platform's performance.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Problems"
          value={data.noProblems}
          icon={<ListTodo size={28} />}
          gradient="bg-gradient-to-br from-indigo-500 to-violet-600"
        />
        <StatCard
          title="Total Submissions"
          value={data.noSubmissions}
          icon={<CheckCircle size={28} />}
          gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Active Users"
          value={data.noUsers}
          icon={<BarChart2 size={28} />}
          gradient="bg-gradient-to-br from-amber-500 to-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActionCard
              to="problems/create-new"
              title="Create Problem"
              description="Add a new coding challenge to the problem library."
              icon={<PlusSquare size={24} />}
            />
            <ActionCard
              to="problems"
              title="Manage Problems"
              description="View, edit, or delete existing coding challenges."
              icon={<ListTodo size={24} />}
            />
            <ActionCard
              to="users"
              title="Manage Users"
              description="View, edit, or create platform users."
              icon={<Users size={24} />}
            />
            <ActionCard
              to="video-solutions"
              title="Manage Video Solutions"
              description="Upload or delete video solutions."
              icon={<Video size={24} />}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Submissions</h3>
          <div className="bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-1 shadow-lg">
            {
              data.latestSubmissions?.map((submission) =>
                <RecentSubmissionItem key={submission._id} title={submission.problemId.title} user={submission.userId.username} status={getProcessedStatus(submission.status)} time={getTimeStamp(submission.createdAt)} />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
