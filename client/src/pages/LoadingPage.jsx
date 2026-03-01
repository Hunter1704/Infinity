import React from 'react';
import { motion } from 'framer-motion';
import InfinityLogo from '../components/shared/InfinityLogo';

const LoadingPage = () => {
  return (
    <div className="bg-white dark:bg-[#0B0F19] absolute top-0 w-full h-full flex flex-col items-center justify-center z-[100] gap-6">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-cyan-500/10 blur-[100px] rounded-full"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <InfinityLogo size={8} />
      </motion.div>

      {/* Modern spinner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2"
      >
        <div className="flex space-x-1.5">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0 }}
            className="w-2.5 h-2.5 rounded-full bg-indigo-500"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
            className="w-2.5 h-2.5 rounded-full bg-violet-500"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
            className="w-2.5 h-2.5 rounded-full bg-cyan-500"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingPage;