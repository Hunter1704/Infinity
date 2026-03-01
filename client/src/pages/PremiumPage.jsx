import React, { useEffect, useState } from "react";
import { Crown, Sparkles } from "lucide-react";
import { useParams, Outlet } from "react-router";
import { PremiumPlanCard } from "../components";
import { motion } from "framer-motion";

const PRO_PLANS = [
  {
    id: "monthly",
    tag: "Monthly",
    name: "Pro Monthly",
    price: "₹10",
    priceInPaisa: 1000,
    cycle: "per month",
    features: [
      "Access to all problems",
      "Unlimited contest participation",
      "AI-powered hints",
      "Priority email support",
    ],
    cta: "Upgrade to Pro",
  },
  {
    id: "yearly",
    tag: "Yearly",
    name: "Pro Yearly",
    price: "₹100",
    priceInPaisa: 10000,
    originalPrice: "₹120",
    cycle: "per year",
    features: [
      "Access to all problems",
      "Unlimited contest participation",
      "AI-powered hints",
      "Priority email support",
    ],
    cta: "Upgrade to Pro",
    bestValue: true,
  },
];




const PremiumPage = () => {
  const { planId } = useParams();
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (!planId) setSelectedPlan(null);
    const requiredPlan = PRO_PLANS.find((p) => p.id === planId);
    setSelectedPlan(requiredPlan);
  }, [planId]);

  if (!planId)
    return (
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-30 relative">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-indigo-500/10 via-violet-500/10 to-transparent blur-[100px] rounded-full"></div>
        </div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 relative z-10"
        >
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 dark:from-amber-500/10 dark:to-amber-700/10 mb-4">
            <Crown className="h-10 w-10 sm:h-12 sm:w-12 text-amber-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Infinity <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Premium</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Unlock exclusive features, accelerate your learning, and land your dream job with our premium plans.
          </p>
        </motion.header>

        {/* Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 justify-center relative z-10"
        >
          {PRO_PLANS.map((plan) => (
            <PremiumPlanCard
              key={plan.id}
              plan={plan}
            />
          ))}
        </motion.div>
      </div>
    );

  return <Outlet context={{ plan: selectedPlan }} />
};

export default PremiumPage;
