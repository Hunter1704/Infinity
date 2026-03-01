import React from 'react';
import { InfinityLogo } from "..";
import { NavLink } from 'react-router';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact', href: '/contact-us' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Hunter1704' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/jatin-agrawal-engg/' },
  ];

  return (
    <footer className="relative bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200/60 dark:border-slate-800/60 transition-colors duration-300">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="flex items-center">
              <InfinityLogo size={6} className="" />
              <span className="font-extrabold text-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 dark:from-indigo-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent ml-2">Infinity</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              Sharpen your coding skills and forge your future with our comprehensive problem-solving platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-[0.15em] uppercase">Quick Links</h3>
            <ul role="list" className="mt-5 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <NavLink to={link.href} className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-[0.15em] uppercase">Connect With Us</h3>
            <ul role="list" className="mt-5 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} target='_blank' className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <div className="mt-14 border-t border-slate-200/60 dark:border-slate-800/60 pt-8 text-center">
          <p className="text-sm text-slate-400 dark:text-slate-500">&copy; {new Date().getFullYear()} Infinity. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;