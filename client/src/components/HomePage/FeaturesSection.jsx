import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

const CODE_BRACKET_ICON_PATH = "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5";
const CHART_BAR_ICON_PATH = "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z";
const TAG_ICON_PATH = "M12.586 2.586A2 2 0 0011.172 2H4.5A2.5 2.5 0 002 4.5v6.672a2 2 0 00.586 1.414l7.414 7.414a2 2 0 002.828 0l6.672-6.672a2 2 0 000-2.828l-7.414-7.414zM9 8.25a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z";
const TROPHY_ICON_PATH = "M16.5 18.75h-9m9 0a3.375 3.375 0 0 1-3.375-3.375h-2.25a3.375 3.375 0 0 1-3.375 3.375m9 0V15M6.75 15V18.75m0-9A2.25 2.25 0 0 1 9 6.75h6A2.25 2.25 0 0 1 17.25 9v3H6.75V9Z M15 6.75V3.75A2.25 2.25 0 0 0 12.75 1.5h-1.5A2.25 2.25 0 0 0 9 3.75v3";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const FeaturesSection = () => (
  <section
    id="features"
    className="py-24 sm:py-32 bg-white dark:bg-[#0B0F19] transition-colors duration-300 relative overflow-hidden"
  >
    {/* Background decors */}
    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-3xl"></div>

    <div className="max-w-7xl mx-auto px-6 relative z-10">

      {/* Heading */}
      <div className="text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          Built for{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
            Serious Coders
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400"
        >
          Infinity gives you everything you need to master DSA,
          crack interviews, and compete globally.
        </motion.p>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={itemVariants}>
          <FeatureCard
            iconPath={CODE_BRACKET_ICON_PATH}
            title="Curated Problem Bank"
            description="Solve real interview-level coding problems with structured learning paths."
            isOutlineIcon
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FeatureCard
            iconPath={CHART_BAR_ICON_PATH}
            title="Smart Tracking"
            description="Track your accuracy, streaks, and get performance insights to improve."
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FeatureCard
            iconPath={TAG_ICON_PATH}
            title="Topic & Company Tags"
            description="Filter problems by data structures, algorithms, or top companies."
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FeatureCard
            iconPath={TROPHY_ICON_PATH}
            title="Live Contests"
            description="Compete in timed coding battles globally and climb the leaderboard."
            isOutlineIcon
          />
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default FeaturesSection;