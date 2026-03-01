import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, LockIcon, EyeIcon, DatabaseIcon } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div
      className="
            min-h-screen
            bg-slate-50 dark:bg-[#0B0F19]
            transition-colors duration-300
            relative overflow-hidden
          "
    >
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent blur-[120px] rounded-full dark:from-indigo-500/10 dark:via-violet-500/5 opacity-60"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 pt-20 pb-24 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
                backdrop-blur-xl
                bg-white/70 dark:bg-slate-900/50
                border border-slate-200/50 dark:border-slate-800/60
                rounded-3xl
                p-8 md:p-14
                shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]
              "
        >
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-slate prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-indigo-600 dark:prose-a:text-indigo-400">

            {/* Title */}
            <div className="mb-12 border-b border-slate-200 dark:border-slate-800/60 pb-8 text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
                <ShieldCheckIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h1 className="
                      text-4xl md:text-5xl font-extrabold
                      text-slate-900 dark:text-white mb-4 mt-0
                      tracking-tight
                    ">
                  Privacy Policy
                </h1>

                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 m-0">
                  Last Updated: {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>



            <h2 className="flex items-center gap-3"><EyeIcon className="w-6 h-6 text-indigo-500" /> 1. Introduction</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Welcome to <strong className="text-indigo-600 dark:text-indigo-400">Infinity</strong> ("we," "our," or "us"). We are committed to protecting your privacy...
            </p>

            <h2 className="flex items-center gap-3"><DatabaseIcon className="w-6 h-6 text-violet-500" /> 2. Information We Collect</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">We collect information that you provide directly to us, information we collect automatically when you use our Service, and information from third-party sources.</p>

            <h3 className="text-slate-800 dark:text-slate-200">Information You Provide to Us</h3>
            <ul className="text-slate-600 dark:text-slate-300 space-y-2">
              <li><strong className="text-slate-800 dark:text-slate-200">Account Information:</strong> When you register for an account, we collect your name, email address, and password (which is hashed). If you register using a third-party service like Google or GitHub, we collect information provided by that service, such as your name, email, and public profile information.</li>
              <li><strong className="text-slate-800 dark:text-slate-200">Profile Information:</strong> You may choose to provide additional information for your user profile, such as a profile picture.</li>
              <li><strong className="text-slate-800 dark:text-slate-200">User Content:</strong> We collect the content you create and upload to the Service. This includes your code submissions, comments, notes on submissions, and problems you add to custom "sprints."</li>
              <li><strong className="text-slate-800 dark:text-slate-200">AI Tutor Communications:</strong> When you interact with our AI Tutor, we collect the queries and code snippets you provide to the service to facilitate responses.</li>
              <li><strong className="text-slate-800 dark:text-slate-200">Communications:</strong> If you contact us directly, we may receive additional information about you, such as your name, email address, the contents of the message, and/or attachments you may send us.</li>
            </ul>

            <h3 className="text-slate-800 dark:text-slate-200">Information We Collect Automatically</h3>
            <ul className="text-slate-600 dark:text-slate-300 space-y-2">
              <li><strong className="text-slate-800 dark:text-slate-200">Log and Usage Data:</strong> Our servers automatically record information when you use the Service, including your IP address, browser type, operating system, pages visited, access times, and referring website addresses. We also track your activity on the platform, such as problems solved and submission history, to provide you with daily and yearly activity statistics.</li>
              <li><strong className="text-slate-800 dark:text-slate-200">Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">We use the information we collect for various purposes, including to:</p>
            <ul className="text-slate-600 dark:text-slate-300 space-y-2">
              <li>Provide, operate, and maintain our Service.</li>
              <li>Create and manage your account, including processing payments for premium services via our third-party payment processor (Razorpay).</li>
              <li>Execute your code securely using our third-party code execution engine (Judge0).</li>
              <li>Provide AI-powered guidance and analysis through our integration with the Google GenAI SDK.</li>
              <li>Improve, personalize, and expand our Service.</li>
              <li>Understand and analyze how you use our Service for analytics and to improve user experience.</li>
              <li>Communicate with you, either directly or through one of our partners, for customer service, to provide you with updates and other information relating to the Service, and for marketing and promotional purposes.</li>
              <li>Enhance the security of our Service.</li>
            </ul>

            <h2>4. How We Share Your Information</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">We do not sell your personal information. We may share information we have collected about you in certain situations:</p>
            <ul className="text-slate-600 dark:text-slate-300 space-y-2">
              <li><strong className="text-slate-800 dark:text-slate-200">Third-Party Service Providers:</strong> We share information with third-party vendors and service providers that perform services on our behalf, such as code execution (Judge0), AI services (Google), media storage (Cloudinary), payment processing (Razorpay), and email delivery (Nodemailer). These providers only have access to the information necessary to perform their functions.</li>
              <li><strong className="text-slate-800 dark:text-slate-200">Publicly Shared Information:</strong> Your username and certain activity, such as your rank on the leaderboard or any public sprints you create, may be visible to other users of the Service.</li>
              <li><strong className="text-slate-800 dark:text-slate-200">Advertising Partners:</strong> We may share information with third-party advertising partners to show you ads that might interest you. This is further detailed in the "Advertising and Analytics" section below.</li>
              <li><strong className="text-slate-800 dark:text-slate-200">Legal Obligations:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
            </ul>

            <h2>5. Advertising and Analytics</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">To support and enhance our Service, we may use third-party advertising services like Google AdSense. These services help us provide many of our features for free.</p>
            <ul className="text-slate-600 dark:text-slate-300 space-y-2">
              <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites.</li>
              <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
              <li>
                You may opt out of personalized advertising by visiting Google's{' '}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500 transition-colors">
                  Ads Settings
                </a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting{' '}
                <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500 transition-colors">
                  www.aboutads.info/choices
                </a>.
              </li>
            </ul>

            <h2>6. Your Data Rights and Choices</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Depending on your location, you may have certain rights regarding your personal information. These rights may include:</p>
            <ul className="text-slate-600 dark:text-slate-300 space-y-2">
              <li><strong className="text-slate-800 dark:text-slate-200">Access:</strong> You have the right to access your personal data through your profile page.</li>
              <li><strong className="text-slate-800 dark:text-slate-200">Correction:</strong> You can update or correct inaccuracies in your information through your account settings.</li>
              <li><strong className="text-slate-800 dark:text-slate-200">Deletion:</strong> You may request the deletion of your account and associated personal data by contacting us. Please note that we may need to retain certain information for legal or administrative purposes.</li>
              <li><strong className="text-slate-800 dark:text-slate-200">Opt-Out of Communications:</strong> You may opt out of receiving promotional emails from us by following the unsubscribe link included in such emails.</li>
            </ul>

            <h2 className="flex items-center gap-3"><LockIcon className="w-6 h-6 text-cyan-500" /> 7. Data Security</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">We use administrative, technical, and physical security measures to help protect your personal information. We use bcrypt for hashing passwords and JWT for securing sessions. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>

            <h2>8. Children's Privacy</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Our Service is not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you become aware that a child has provided us with Personal Information, please contact us.</p>

            <h2>9. Changes to This Privacy Policy</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>

            <div className="mt-12 p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
              <h2 className="mt-0 mb-4 text-slate-900 dark:text-white flex items-center gap-3">10. Contact Us</h2>
              <p className="text-slate-600 dark:text-slate-300 m-0">
                If you have any questions or comments about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:contact@infinity.dev" className="text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-500 transition-colors">
                  contact@infinity.dev
                </a>.
              </p>
            </div>

            {/* KEEP ALL YOUR REMAINING CONTENT EXACTLY SAME BELOW */}

          </article>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;