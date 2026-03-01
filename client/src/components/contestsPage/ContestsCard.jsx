import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Users } from 'lucide-react';

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days > 0 ? `${days}d ` : ''}${hours
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
};

const ContestCard = ({ contest, onViewContest }) => {
  const [timeRemaining, setTimeRemaining] = useState('');

  const { status, startTime, endTime } = contest;

  useEffect(() => {
    if (status === 'ended') {
      setTimeRemaining('');
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const targetTime =
        status === 'upcoming'
          ? new Date(startTime).getTime()
          : new Date(endTime).getTime();
      const diff = targetTime - now;

      if (diff > 0) {
        setTimeRemaining(formatTime(diff));
      } else {
        setTimeRemaining('');
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [status, startTime, endTime]);

  const statusInfo = useMemo(() => {
    switch (status) {
      case 'live':
        return {
          text: 'Live',
          className:
            'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
          timerLabel: 'Ends in:',
        };
      case 'upcoming':
        return {
          text: 'Upcoming',
          className:
            'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
          timerLabel: 'Starts in:',
        };
      case 'ended':
        return {
          text: 'Ended',
          className:
            'bg-slate-500/10 text-slate-500 border-slate-500/20',
          timerLabel: '',
        };
      default:
        return {};
    }
  }, [status]);

  return (
    <div
      onClick={() => onViewContest(contest.id)}
      className="
        group relative
        backdrop-blur-xl
        bg-white/70 dark:bg-slate-900/50
        border border-slate-200/50 dark:border-slate-800/60
        rounded-3xl p-6 sm:p-8
        flex flex-col justify-between
        transition-all duration-300
        hover:-translate-y-2
        shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
        hover:border-indigo-500/30 dark:hover:border-indigo-500/30
        cursor-pointer
        overflow-hidden
        h-full
      "
    >
      {/* Glow Hover Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none"></div>

      <div className="relative z-10 flex-grow">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 gap-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight line-clamp-2">
            {contest.name}
          </h3>

          <span
            className={`
              shrink-0 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border
              ${statusInfo.className}
              backdrop-blur-md
            `}
          >
            {statusInfo.text}
          </span>
        </div>

        {/* Timer */}
        <div className="space-y-3 mb-8">
          {timeRemaining && (
            <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
              <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/50 text-indigo-500">
                <Clock size={16} />
              </div>
              <span className="font-medium text-slate-500">{statusInfo.timerLabel}</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {timeRemaining}
              </span>
            </div>
          )}

          {/* Participants */}
          <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/50 text-violet-500">
              <Users size={16} />
            </div>
            <span className="font-medium">
              {contest.participants.toLocaleString()} Participants
            </span>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="relative z-10 mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/50">
        <button
          className="
            flex items-center justify-center gap-2
            w-full py-3 rounded-xl font-semibold
            bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500
            hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600
            text-white
            transition-all duration-300
            shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]
          "
        >
          View Contest
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ContestCard;
