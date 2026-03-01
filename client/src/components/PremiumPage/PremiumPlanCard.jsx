import React from "react";
import { Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const PremiumPlanCard = ({ plan }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`relative cursor-pointer rounded-2xl p-5 sm:p-6 flex flex-col transition-all duration-300 border 
            bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-500/30 hover:shadow-xl shadow-lg`}
            onClick={() => navigate(`${plan.id}/checkout`)}
        >
            {plan.bestValue && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 text-white px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                    <Sparkles size={12} />
                    Best Value
                </div>
            )}
            <div className="flex-grow">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {plan.name}
                    </h3>
                    <span className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
                        {plan.tag}
                    </span>
                </div>
                <div className="flex flex-wrap items-baseline my-3">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                        {plan.price}
                    </span>
                    <span className="ml-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        / {plan.cycle}
                    </span>
                    {plan.originalPrice && (
                        <span className="ml-2 text-[10px] sm:text-xs text-red-500 line-through">
                            {plan.originalPrice}
                        </span>
                    )}
                </div>
                <ul className="space-y-2 mt-3">
                    {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center space-x-2.5">
                            <Check size={16} className="text-emerald-500 flex-shrink-0" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <button
                className="mt-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 text-white hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600 shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)]"
            >
                {plan.cta}
            </button>
        </motion.div>
    );
};

export default PremiumPlanCard;
