import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import CourseCard from "./CourseCard";

const courses = [
  {
    imageUrl: "https://i.ytimg.com/vi/WOyZid8OkkI/sddefault.jpg",
    title: "GenAI Deep Dive",
    description: "Master Generative AI from fundamentals to real-world architecture.",
    level: "All Levels",
    duration: "Ongoing",
    redirect: "courses/PLd7PleJR_EFfRYiLdagOsv4FczMl1Cxt_",
  },
  {
    imageUrl: "https://i.ytimg.com/vi/AK0hu0Zxua4/sddefault.jpg",
    title: "System Design (LLD)",
    description: "Build scalable systems with strong low-level design principles.",
    level: "All Levels",
    duration: "40+ Hours",
    redirect: "courses/PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT",
  },
  {
    imageUrl: "https://i.ytimg.com/vi/moZNKL37w-s/sddefault.jpg",
    title: "Data Structures & Algorithms",
    description: "Crack coding interviews with structured DSA mastery.",
    level: "All Levels",
    duration: "200+ Hours",
    redirect: "courses/PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01",
  },
  {
    imageUrl: "https://i.ytimg.com/vi/y3OOaXrFy-Q/sddefault.jpg",
    title: "Complete C++ Mastery",
    description: "From basics to advanced STL and competitive programming.",
    level: "Beginner",
    duration: "20+ Hours",
    redirect: "courses/PLQEaRBV9gAFsdNoZYUcVG6ygpwd0lUrIH",
  },
];

const Arrow = ({ direction, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      absolute top-1/2 -translate-y-1/2 z-20
      w-12 h-12 rounded-full
      backdrop-blur-xl
      bg-white/80 dark:bg-slate-800/80
      border border-slate-200/50 dark:border-slate-700/50
      shadow-[0_8px_30px_rgb(0,0,0,0.12)]
      flex items-center justify-center
      text-slate-700 dark:text-white
      hover:scale-110 transition-all duration-300
      disabled:opacity-0 disabled:pointer-events-none
      ${direction === "left" ? "left-2 md:-left-4" : "right-2 md:-right-4"}
    `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
    >
      {direction === "left" ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      )}
    </svg>
  </button>
);

const FeaturedCoursesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    const newIndex =
      direction === "left"
        ? Math.max(currentIndex - 1, 0)
        : Math.min(currentIndex + 1, courses.length - 1);

    setCurrentIndex(newIndex);

    const container = scrollContainerRef.current;
    if (container) {
      const card = container.children[newIndex];
      const scrollLeft =
        card.offsetLeft -
        container.offsetWidth / 2 +
        card.offsetWidth / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="courses"
      className="py-24 sm:py-32 bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-300 overflow-hidden relative"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Upgrade Your{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
              Coding Arsenal
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400"
          >
            Structured learning paths designed to help you master DSA,
            system design, and emerging technologies.
          </motion.p>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto px-0 sm:px-10 z-10">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-x-6 md:gap-x-8 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide py-10 px-6 sm:px-0"
        >
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              {...course}
              isFeatured={index === currentIndex}
            />
          ))}
        </div>

        <Arrow
          direction="left"
          onClick={() => handleScroll("left")}
          disabled={currentIndex === 0}
        />
        <Arrow
          direction="right"
          onClick={() => handleScroll("right")}
          disabled={currentIndex === courses.length - 1}
        />
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;