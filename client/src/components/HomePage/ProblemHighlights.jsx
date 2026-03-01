import { motion } from "framer-motion";
import ProblemHighlightCard from "./ProblemHighlightCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};


const ProblemHighlights = () => (
  <section
    id="problems"
    className="relative py-24 sm:py-32 bg-slate-50 dark:bg-[#080B14] transition-colors duration-300 overflow-hidden"
  >
    {/* Subtle background glow */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500/5 via-amber-500/5 to-rose-500/5 blur-[100px] rounded-full dark:from-emerald-500/10 dark:via-amber-500/10 dark:to-rose-500/10"></div>
    </div>

    <div className="relative max-w-7xl mx-auto px-6 z-10">

      {/* Header */}
      <div className="text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          Practice by Difficulty
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400"
        >
          Structured problem sets designed to help you progressively master
          data structures and algorithms — from fundamentals to advanced patterns.
        </motion.p>
      </div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <motion.div variants={itemVariants}>
          <ProblemHighlightCard
            title="Easy"
            description="Start with foundational problems to build clarity in logic, syntax, and core data structures."
            borderColor="border-t-emerald-500"
            textColor="text-emerald-600 dark:text-emerald-400"
            bgColor="bg-emerald-500/10 dark:bg-emerald-500/20"
            iconColor="text-emerald-500"
            problemsCount={100}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ProblemHighlightCard
            title="Medium"
            description="Strengthen your problem-solving skills with patterns commonly asked in technical interviews."
            borderColor="border-t-amber-500"
            textColor="text-amber-600 dark:text-amber-400"
            bgColor="bg-amber-500/10 dark:bg-amber-500/20"
            iconColor="text-amber-500"
            problemsCount={302}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ProblemHighlightCard
            title="Hard"
            description="Challenge yourself with advanced algorithmic problems designed for top-tier interview preparation."
            borderColor="border-t-rose-500"
            textColor="text-rose-600 dark:text-rose-400"
            bgColor="bg-rose-500/10 dark:bg-rose-500/20"
            iconColor="text-rose-500"
            problemsCount={100}
          />
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default ProblemHighlights;