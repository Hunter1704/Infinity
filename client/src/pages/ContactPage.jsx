import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  MailIcon,
  UserIcon,
  SendIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  MessageSquareIcon,
} from 'lucide-react';

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((res) => setTimeout(res, 1500));
    console.log('Form Submitted:', data);
    reset(); // clear fields after submit
  };

  const InputField = ({ id, name, type, placeholder, icon, registerField, error }) => (
    <div className="relative group">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
        {placeholder}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
          {icon}
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`block w-full rounded-2xl border-0 bg-slate-50 dark:bg-slate-900/50 py-4 pl-12 pr-4 text-slate-900 dark:text-slate-100 ring-1 ring-inset ${error ? 'ring-red-500 focus:ring-red-500' : 'ring-slate-200 dark:ring-slate-700 focus:ring-indigo-500'
            } placeholder:text-slate-400 focus:ring-2 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 shadow-sm`}
          {...registerField}
        />
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-sm text-red-500 mt-2 font-medium flex items-center gap-1">
          {error.message}
        </motion.p>
      )}
    </div>
  );

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
        <div className="absolute -top-40 right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent blur-[120px] rounded-full dark:from-indigo-500/10 dark:via-violet-500/5 opacity-60"></div>
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 to-indigo-500/5 blur-[100px] rounded-full opacity-50"></div>
      </div>

      <div className="max-w-4xl mx-auto py-20 px-6 lg:px-10 relative z-10">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <h1 className="
            text-5xl md:text-6xl font-extrabold
            text-slate-900 dark:text-white
            tracking-tight
          ">
            Contact <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">Infinity</span>
          </h1>

          <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Questions, feedback, or feature ideas? We’d love to hear from you.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="mailto:contact@infinity.dev"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-slate-800 shadow-[0_4px_14px_0_rgb(0,0,0,0.05)] dark:shadow-none border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-0.5"
            >
              <MailIcon className="w-5 h-5 text-indigo-500" />
              contact@infinity.dev
            </a>
          </div>
        </motion.header>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="
            backdrop-blur-xl
            bg-white/70 dark:bg-slate-900/50
            border border-slate-200/50 dark:border-slate-800/60
            rounded-3xl
            p-10 md:p-14
            shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]
          "
        >
          {isSubmitSuccessful ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-100 dark:border-emerald-500/20">
                <CheckCircleIcon size={48} className="text-emerald-500" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                Message Delivered 🚀
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                Thanks for reaching out to Infinity. We’ll respond as soon as possible.
              </p>
              <button onClick={() => reset()} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputField
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  icon={<UserIcon className="h-5 w-5" />}
                  registerField={register('name', { required: 'Name is required' })}
                  error={errors.name}
                />
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  icon={<MailIcon className="h-5 w-5" />}
                  registerField={register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email address',
                    },
                  })}
                  error={errors.email}
                />
              </div>

              <InputField
                id="subject"
                name="subject"
                type="text"
                placeholder="Subject"
                icon={<MessageSquareIcon className="h-5 w-5" />}
                registerField={register('subject', { required: 'Subject is required' })}
                error={errors.subject}
              />

              <div className="group">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell us what's on your mind..."
                  className={`block w-full rounded-2xl border-0 bg-slate-50 dark:bg-slate-900/50 py-4 px-5 text-slate-900 dark:text-slate-100 ring-1 ring-inset ${errors.message
                      ? 'ring-red-500 focus:ring-red-500'
                      : 'ring-slate-200 dark:ring-slate-700 focus:ring-indigo-500'
                    } focus:ring-2 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 shadow-sm resize-y`}
                  {...register('message', { required: 'Message is required' })}
                />
                {errors.message && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-sm text-red-500 mt-2 font-medium flex items-center gap-1">
                    {errors.message.message}
                  </motion.p>
                )}
              </div>

              {Object.keys(errors).length > 0 && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-3 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 p-4 rounded-xl border border-red-100 dark:border-red-500/20">
                  <AlertTriangleIcon size={20} className="shrink-0" />
                  <p className="font-medium text-sm">Please correct the highlighted fields before submitting.</p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full flex justify-center items-center space-x-3
                  py-4 px-6
                  rounded-2xl
                  text-lg font-bold text-white
                  bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500
                  hover:shadow-[0_8px_30px_rgb(99,102,241,0.3)]
                  disabled:opacity-50 disabled:cursor-wait
                  transition-all duration-300 hover:-translate-y-1 active:translate-y-0
                "
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <SendIcon size={20} className="mr-1" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
