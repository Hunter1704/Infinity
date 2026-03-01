import { NavLink } from "react-router";
import { motion } from "framer-motion";

const CallToActionSection = () => (
  <section className="relative py-20 sm:py-32 overflow-hidden bg-white dark:bg-[#0B0F19] transition-colors duration-300">

    {/* Background Gradient Glow */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 
        bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-cyan-500/10 
        rounded-full blur-[100px] dark:from-indigo-500/5 dark:via-violet-500/5 dark:to-cyan-500/5">
      </div>
    </div>

    <div className="relative max-w-4xl mx-auto px-6 text-center z-10">

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white"
      >
        Ready to Level Up Your Coding?
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
      >
        Join thousands of developers solving real interview problems,
        mastering algorithms, and building confidence — one challenge at a time.
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12"
      >
        <NavLink to="/problems">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              inline-flex items-center justify-center
              px-10 py-4
              rounded-2xl
              text-lg font-semibold
              text-white
              bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500
              hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600
              transition-all duration-300
              shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]
              focus:outline-none focus:ring-2 focus:ring-indigo-500/50
            "
          >
            Start Solving for Free
          </motion.button>
        </NavLink>
      </motion.div>

    </div>
  </section>
);

export default CallToActionSection;