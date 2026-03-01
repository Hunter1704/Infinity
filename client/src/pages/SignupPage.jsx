import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

import GoogleIcon from '../components/Icons/GoogleIcon';
import GithubIcon from '../components/Icons/GithubIcon';
import SocialButton from '../components/shared/SocialButton';
import InputField from '../components/shared/InputField';
import { useDispatch } from "react-redux";
import { registerUser } from "../slices/authSlice";
import InfinityLogo from '../components/shared/InfinityLogo';


// Icon Paths (Heroicons)
const USER_ICON_PATH = "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z";
const ENVELOPE_ICON_PATH = "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75";
const LOCK_CLOSED_ICON_PATH = "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z";

const signupSchema = z.object({
  username: z.string().min(1, { message: "Username is required." })
    .min(3, { message: "Username must be at least 3 characters." })
    .max(20, { message: "Username must be at most 20 characters." }),
  emailId: z.string().min(1, { message: "Email is required." })
    .email({ message: "Entered value does not match email format." }),
  password: z.string().min(1, { message: "Password is required." })
    .refine(val => val.length >= 8, {
      message: "Min 8 characters",
    })
    .refine(val => /[a-z]/.test(val), {
      message: "Must include lowercase",
    })
    .refine(val => /[A-Z]/.test(val), {
      message: "Must include uppercase",
    })
    .refine(val => /[0-9]/.test(val), {
      message: "Must include number",
    })
    .refine(val => /[^A-Za-z0-9]/.test(val), {
      message: "Must include symbol",
    }),
  confirmPassword: z.string().min(1, { message: "Please confirm your password." })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Set error on confirmPassword field
});

const SignupPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_BASE_URL}/authentication/${provider}`;
  };

  return (
    <div className="relative flex-grow flex items-center justify-center py-16 px-6 bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-300 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-indigo-500/20 via-violet-500/20 to-cyan-500/20 blur-[120px] rounded-full dark:from-indigo-500/10 dark:via-violet-500/10 dark:to-cyan-500/10"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md z-10"
      >
        <div className="w-full space-y-8 p-8 sm:p-10 bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-slate-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">

          {/* Logo + Heading */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
            >
              <InfinityLogo size={8} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 tracking-tight"
            >
              Create your account
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400"
            >
              Start solving problems and track your progress
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 space-y-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >

            <InputField
              id="username"
              label="Username"
              type="text"
              placeholder="Choose a username"
              iconPath={USER_ICON_PATH}
              register={register("username")}
              error={errors.username}
            />

            <InputField
              id="emailId"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              iconPath={ENVELOPE_ICON_PATH}
              register={register("emailId")}
              error={errors.emailId}
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="Create a strong password"
              iconPath={LOCK_CLOSED_ICON_PATH}
              register={register("password")}
              error={errors.password}
              isPasswordField
              isPasswordVisible={showPassword}
              onToggleVisibility={() => setShowPassword(!showPassword)}
            />

            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              iconPath={LOCK_CLOSED_ICON_PATH}
              register={register("confirmPassword")}
              error={errors.confirmPassword}
              isPasswordField
              isPasswordVisible={showConfirmPassword}
              onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="relative w-full py-3 px-4 rounded-xl
                         text-sm font-semibold text-white
                         bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500
                         hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600
                         transition-all duration-300
                         shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              Create Account
            </motion.button>

          </motion.form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative mt-8"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-transparent text-slate-500 dark:text-slate-400">
                Or continue with
              </span>
            </div>
          </motion.div>

          {/* Social Login */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 space-y-3"
          >
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
              <SocialButton
                providerName="Google"
                icon={<GoogleIcon className="h-5 w-5" />}
                onClick={() => handleSocialLogin('google')}
                action="Sign up"
              />
            </motion.div>

            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
              <SocialButton
                providerName="GitHub"
                icon={<GithubIcon className="h-5 w-5 text-slate-800 dark:text-slate-100" />}
                onClick={() => handleSocialLogin('github')}
                action="Sign up"
              />
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
            >
              Log in
            </Link>
          </motion.p>

        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;