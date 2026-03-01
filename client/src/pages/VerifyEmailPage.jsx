import React, { useEffect, useState } from "react";
import axiosClient from "../config/axios";
import { useNavigate, useSearchParams } from "react-router";
import LoadingPage from "./LoadingPage";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [response, setResponse] = useState(null);
  const token = searchParams.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("hello");
    if (token) {
      axiosClient.get(`/authentication/verify-email?token=${token}`)
        .then(res => {
          setResponse(res.data)

        })
        .catch(err => setResponse("Email Verification failed"));
    } else {
      navigate("/")
    }
  }, [token]);

  if (response)
    return (
      <div className="flex justify-center items-center min-h-[80vh] px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center p-10 rounded-3xl bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl border border-white/20 dark:border-slate-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] max-w-md w-full"
        >
          {typeof response === 'string' && response.toLowerCase().includes('failed') ? (
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          ) : (
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          )}
          <p className="text-lg font-semibold text-slate-800 dark:text-white">
            {response}
          </p>
        </motion.div>
      </div>
    )

  return <LoadingPage />;


};

export default VerifyEmailPage;
