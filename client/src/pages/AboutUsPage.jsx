import {
  FileCode,
  Brain,
  ListChecks,
  Trophy,
  Lock,
  Github,
  Linkedin,
  Target,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';


import InfinityLogo from '../components/shared/InfinityLogo';

const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-[#f8fafc] dark:bg-[#1a2332] p-7 rounded-lg border border-[#e2e8f0] dark:border-[#334155] transform hover:-translate-y-1 transition-transform duration-300">
    <div className="flex items-center justify-center w-12 h-12 bg-indigo-50 dark:bg-indigo-500/20 rounded-lg mb-4 text-indigo-500 dark:text-indigo-400">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-[#1e293b] dark:text-[#e2e8f0]">{title}</h3>
    <p className="text-[#475569] dark:text-[#94a3b8]">{children}</p>
  </div>
);

const TechBadge = ({ href, children }) => {
  const badgeContent = (
    <span className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700 transition-colors duration-200 group-hover:bg-indigo-50 group-hover:border-indigo-200 dark:group-hover:bg-indigo-500/20 dark:group-hover:border-indigo-500/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group transform transition-transform duration-200"
      >
        {badgeContent}
      </a>
    );
  }

  return badgeContent;
};

const AboutUsPage = () => {
  const features = [
    {
      icon: <FileCode size={24} className="text-indigo-500" />,
      title: 'Solve DSA Problems',
      description: 'Practice on problems categorized by topic and difficulty to sharpen your skills methodically.',
    },
    {
      icon: <ListChecks size={24} className="text-violet-500" />,
      title: 'Custom Sprints',
      description: 'Organize bookmarked problems into custom collections for focused practice sessions.',
    },
    {
      icon: <Brain size={24} className="text-indigo-500" />,
      title: 'AI-Powered Tutor',
      description: 'Get intelligent hints and guidance without revealing the final answer.',
    },
    {
      icon: <Trophy size={24} className="text-amber-500" />,
      title: 'Compete & Rank',
      description: 'Challenge yourself on the leaderboard and see how you stack up against your peers.',
    },
    {
      icon: <Lock size={24} className="text-emerald-500" />,
      title: 'Secure & Modern',
      description: 'Enjoy a secure platform with JWT & OAuth, Monaco editor, and light/dark modes.',
    },
    {
      icon: <Users size={24} className="text-cyan-500" />,
      title: 'Community Focused',
      description: 'Share problems, discuss solutions, and learn together with other developers.',
    },
  ];

  const technologies = {
    frontend: [
      { name: 'React', href: 'https://react.dev/' },
      { name: 'Vite', href: 'https://vitejs.dev/' },
      { name: 'TailwindCSS', href: 'https://tailwindcss.com/' },
      { name: 'Monaco Editor', href: 'https://microsoft.github.io/monaco-editor/' },
      { name: 'Redux Toolkit', href: 'https://redux-toolkit.js.org/' },
      { name: 'Framer Motion', href: 'https://www.framer.com/motion/' },
    ],
    backend: [
      { name: 'Node.js', href: 'https://nodejs.org/' },
      { name: 'Express', href: 'https://expressjs.com/' },
      { name: 'MongoDB', href: 'https://www.mongodb.com/' },
      { name: 'Redis', href: 'https://redis.io/' },
      { name: 'JWT', href: 'https://jwt.io/' },
    ],
    integrations: [
      { name: 'Judge0 API', href: 'https://judge0.com/' },
      { name: 'Google GenAI SDK', href: 'https://ai.google.dev/sdks' },
      { name: 'OAuth (Google/GitHub)', href: 'https://oauth.net/' },
      { name: 'Cloudinary', href: 'https://cloudinary.com/' },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="
          min-h-screen
          bg-slate-50 dark:bg-[#0B0F19]
          transition-colors duration-300
          relative overflow-hidden
        ">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-[800px] pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent blur-[120px] rounded-full dark:from-indigo-500/10 dark:via-violet-500/5 opacity-60"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-20 pb-24 relative z-10">

        {/* Hero Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24 relative"
        >
          <h1 className="
                text-5xl md:text-6xl font-extrabold
                text-slate-900 dark:text-white
                tracking-tight
              ">
            About <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">Infinity</span>
          </h1>

          <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            A modern problem-solving platform built to help developers master
            data structures, algorithms, and real-world coding challenges.
          </p>
        </motion.header>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className="
                backdrop-blur-xl
                bg-white/70 dark:bg-slate-900/50
                border border-slate-200/50 dark:border-slate-800/60
                rounded-3xl
                p-10 md:p-14
                shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]
              ">
            <h2 className="text-3xl font-bold mb-6 flex items-center justify-center text-slate-900 dark:text-white">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl mr-4 shadow-sm">
                <Target size={28} className="text-indigo-500" />
              </div>
              Our Mission
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-center max-w-3xl mx-auto">
              Infinity was created to eliminate unstructured practice and solution
              dependency. We provide guided learning, AI assistance, structured
              challenges, and competitive ranking — all in one seamless ecosystem.
            </p>
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-4xl font-extrabold text-center mb-14 text-slate-900 dark:text-white">
            What Infinity Offers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                variants={itemVariants}
                key={feature.title}
                className="
                      group
                      backdrop-blur-xl
                      bg-white/70 dark:bg-slate-900/50
                      border border-slate-200/50 dark:border-slate-800/60
                      p-8 rounded-3xl
                      transition-all duration-300
                      hover:-translate-y-2
                      hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
                      hover:border-indigo-200 dark:hover:border-indigo-500/30
                    "
              >
                <div className="
                      w-14 h-14 flex items-center justify-center
                      bg-slate-50 dark:bg-slate-800
                      group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10
                      rounded-2xl mb-6 shadow-sm border border-slate-100 dark:border-slate-700
                      transition-colors duration-300
                    ">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technology */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <h2 className="text-4xl font-extrabold mb-6 text-slate-900 dark:text-white">
            Powered By Modern Tech
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
            Built using scalable and high-performance technologies to ensure
            reliability, speed, and security.
          </p>

          <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/60 p-10 md:p-14 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] space-y-10">
            {Object.entries(technologies).map(([section, techs]) => (
              <div key={section}>
                <h3 className="text-xl font-bold mb-6 capitalize text-slate-900 dark:text-white flex items-center justify-center">
                  <span className="bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full text-indigo-600 dark:text-indigo-400 uppercase text-sm tracking-wider border border-slate-200 dark:border-slate-700">{section}</span>
                </h3>

                <div className="flex flex-wrap justify-center gap-3">
                  {techs.map((tech) => (
                    <TechBadge key={tech.name} href={tech.href}>{tech.name}</TechBadge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
                backdrop-blur-xl
                bg-white/70 dark:bg-slate-900/50
                border border-slate-200/50 dark:border-slate-800/60
                rounded-3xl
                p-12
                shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]
                text-center
                relative overflow-hidden
            ">
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>

          <h2 className="text-3xl font-extrabold mb-12 text-slate-900 dark:text-white relative z-10">
            Meet the Builder
          </h2>

          <div className="max-w-md mx-auto relative z-10">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 rounded-full animate-spin-slow opacity-50 blur-md"></div>
              <img
                src={import.meta.env.VITE_TEAM_PHOTO}
                alt="Jatin Agrawal"
                className="w-full h-full rounded-full border-4 border-white dark:border-slate-800 relative z-10 object-cover shadow-xl"
              />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Jatin Agrawal
            </h3>

            <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500 font-bold mb-4">
              Full Stack Developer
            </p>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 font-medium">
              Creator of Infinity — focused on building structured learning tools
              that help developers grow through disciplined practice and AI guidance.
            </p>

            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/Hunter1704"
                target="_blank"
                className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all shadow-sm"
              >
                <Github size={22} />
              </a>

              <a
                href="https://www.linkedin.com/in/jatin-agrawal-engg/"
                target="_blank"
                className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all shadow-sm"
              >
                <Linkedin size={22} />
              </a>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default AboutUsPage;