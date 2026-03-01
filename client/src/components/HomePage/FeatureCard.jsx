import Icon from "../shared/Icon";

const FeatureCard = ({
  iconPath,
  title,
  description,
  isOutlineIcon = false,
}) => (
  <div
    className="
      group
      relative
      bg-white/70 dark:bg-slate-900/50
      backdrop-blur-xl
      p-8
      rounded-3xl
      border border-slate-200/50 dark:border-slate-800/60
      shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]
      transition-all duration-300
      hover:-translate-y-2
      hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
      hover:border-indigo-500/30 dark:hover:border-indigo-500/30
    "
  >
    {/* Gradient Hover Glow */}
    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-b from-indigo-500/5 via-violet-500/5 to-transparent pointer-events-none"></div>

    {/* Icon */}
    <div
      className="
        flex items-center justify-center
        w-14 h-14
        rounded-2xl
        bg-gradient-to-br from-indigo-50 dark:from-indigo-500/10 to-violet-50 dark:to-violet-500/10
        text-indigo-600 dark:text-indigo-400
        mb-6
        transition-all duration-300
        group-hover:scale-110 group-hover:-rotate-3
        shadow-sm
      "
    >
      <Icon
        d={iconPath}
        className="w-7 h-7"
        isOutline={isOutlineIcon}
        pathProps={
          isOutlineIcon ? {} : { fillRule: "evenodd", clipRule: "evenodd" }
        }
        svgProps={{}}
      />
    </div>

    {/* Title */}
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
      {title}
    </h3>

    {/* Description */}
    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
      {description}
    </p>
  </div>
);

export default FeatureCard;