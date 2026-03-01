import React from 'react';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentFailedPage = ({ onRetry, onBackToPlans }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center max-w-lg mx-auto py-10"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="p-5 bg-red-500/10 dark:bg-red-500/20 rounded-full mb-6"
      >
        <AlertTriangle size={64} className="text-red-500" />
      </motion.div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
        Payment Failed
      </h1>

      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Unfortunately, we couldn't process your payment. This could be due to a
        network issue, or the payment was cancelled.
      </p>

      <div className="mt-8 w-full flex flex-col sm:flex-row gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRetry}
          className="w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)]"
        >
          <RefreshCw size={16} />
          <span>Try Again</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBackToPlans}
          className="w-full bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl text-slate-900 dark:text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all duration-300 border border-slate-200 dark:border-slate-700"
        >
          <ArrowLeft size={16} />
          <span>View Plans</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PaymentFailedPage;
