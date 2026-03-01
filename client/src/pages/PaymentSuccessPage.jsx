import React from 'react';
import { CheckCircle, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentSuccessPage = ({ plan, onComplete }) => {
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
        className="p-5 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full mb-6"
      >
        <CheckCircle size={64} className="text-emerald-500" />
      </motion.div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
        Payment Successful!
      </h1>

      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Welcome to Infinity Premium! You have successfully subscribed to the
        <span className="font-bold text-slate-900 dark:text-white">
          {' '}
          {plan.name}
        </span>{' '}
        plan.
      </p>

      <div className="mt-8 bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/60 dark:border-slate-700/60 w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
          You now have access to:
        </h2>
        <ul className="space-y-3 text-left">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center space-x-3">
              <Zap size={16} className="text-indigo-500 flex-shrink-0" />
              <span className="text-slate-600 dark:text-slate-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onComplete}
        className="w-full mt-8 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)]"
      >
        <Sparkles size={18} />
        <span>Start Coding</span>
      </motion.button>
    </motion.div>
  );
};

export default PaymentSuccessPage;
