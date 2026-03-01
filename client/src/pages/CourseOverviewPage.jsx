import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import { MOCK_COURSES, MOCK_TESTIMONIALS, APP_ROUTES, courses } from '../utils/constants';
import TestimonialCard from '../components/coursePage/TestimonialCard';
import { StarIcon, ClockIcon, UsersIcon, CheckCircleIcon, BookOpenIcon, ChevronDownIcon, ChevronUpIcon, VideoCameraIcon, AcademicCapIcon, ArrowRightIcon } from '../components/Icons/CoursesPageIcons';
import axiosClient from '../config/axios';

const CourseOverviewPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${courseId}&maxResults=50&key=${import.meta.env.VITE_YT_V3_API_KEY}`);
        const { items } = await response.json();
        const foundCourse = courses.find(c => c.id === courseId) || null;
        foundCourse.curriculum = [{ id: "rm1", title: foundCourse.title, lectures: items }];
        setCourse(foundCourse);
      } catch (error) {
        console.log(error);
      }
    }
    getCourse();
    // const foundCourse = courses.find(c => c.id === courseId) || null;
    // setCourse(foundCourse);
    // if (foundCourse) {
    //   const courseTestimonials = MOCK_TESTIMONIALS.filter(t => t.courseId === foundCourse.id);
    //   setTestimonials(courseTestimonials);
    //   if (foundCourse.curriculum && foundCourse.curriculum.length > 0) {
    //     setExpandedModules({ [foundCourse.curriculum[0].id]: true });
    //   }
    // }
  }, [courseId]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0B0F19]">
        <h1 className="text-2xl text-slate-800 dark:text-white font-bold">Course not found.</h1>
        <Link to={APP_ROUTES.courses} className="ml-4 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 font-medium">Back to Courses</Link>
      </div>
    );
  }

  const firstLectureUrl = course.curriculum?.[0]?.lectures?.[0]?.id
    ? APP_ROUTES.courseContent.replace(':courseId', course.id).replace(':lectureId', course.curriculum[0].lectures[0].id)
    : '#';

  return (
    <div className="bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/50 dark:border-slate-800/60 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-b from-indigo-500/10 via-violet-500/5 to-transparent blur-[120px] rounded-full dark:from-indigo-500/10 dark:via-violet-500/5 pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-3 lg:gap-x-12 gap-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-5"
          >
            <p className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20">{course.category.join(', ')}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">{course.title}</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">{course.tagline}</p>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-500 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Last updated: {course.publishedAt}
            </p>

            {/* Instructor and Stats */}
            <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800/50">
              <div className="flex items-center space-x-3">
                <img src={course.instructorProfileImageUrl} alt={course.istructorName} className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 shadow-sm" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Created by</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{course.istructorName}</span>
                </div>
              </div>
              {course.rating && (
                <div className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700/50">
                  <StarIcon className="w-4 h-4 text-amber-400 mr-1.5" />
                  <span>{course.rating.toFixed(1)} rating</span>
                </div>
              )}
              {course.enrollmentCount && (
                <div className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400">
                  <UsersIcon className="w-5 h-5 mr-1.5 text-indigo-500" /> {course.enrollmentCount.toLocaleString()} students
                </div>
              )}
              <div className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400">
                <ClockIcon className="w-5 h-5 mr-1.5 text-violet-500" /> {course.itemCount} lectures
              </div>
              <div className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400">
                <AcademicCapIcon className="w-5 h-5 mr-1.5 text-cyan-500" /> {course.difficulty}
              </div>
            </div>
          </motion.div>

          {/* Course Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 mt-8 lg:mt-0"
          >
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden border border-slate-200/50 dark:border-slate-800/60 sticky top-24">
              <div className="relative">
                <img src={course.url} alt={course.title} className="w-full h-60 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div>
              <div className="p-8 space-y-6">
                <div className="text-center">
                  {course.isFree ? (
                    <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">FREE</p>
                  ) : (
                    <p className="text-4xl font-extrabold text-slate-900 dark:text-white">${course.price.toFixed(2)}</p>
                  )}
                </div>
                <Link
                  to={firstLectureUrl}
                  className="group w-full inline-flex justify-center items-center px-4 py-4 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all duration-300"
                >
                  {course.isFree ? 'Start Learning Now' : 'Enroll in Course'}
                  <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 text-center flex items-center justify-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  30-Day Money-Back Guarantee
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-12 gap-y-12 relative z-10">
        <div className="lg:col-span-2 space-y-12">
          {/* Description */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/50 dark:border-slate-800/60 p-8 sm:p-10"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500"><BookOpenIcon className="w-6 h-6" /></span>
              About This Course
            </h2>
            <div className="prose prose-slate dark:prose-invert text-slate-600 dark:text-slate-300 max-w-none leading-relaxed" dangerouslySetInnerHTML={{ __html: course.description.replace(/\n/g, '<br/>') }} />
          </motion.section>

          {/* Curriculum */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-violet-50 dark:bg-violet-500/10 text-violet-500"><VideoCameraIcon className="w-6 h-6" /></span>
              Course Curriculum
            </h2>
            <div className="space-y-4">
              {course.curriculum.map(module => (
                <div key={module.id} className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-[0_4px_15px_rgb(0,0,0,0.02)] border border-slate-200/50 dark:border-slate-800/60 overflow-hidden">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex justify-between items-center p-5 sm:p-6 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100/50 dark:hover:bg-slate-800/60 transition-colors focus:outline-none"
                  >
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white text-left">{module.title}</h3>
                    <div className={`p-1.5 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 transition-transform duration-300 ${expandedModules[module.id] ? 'rotate-180' : ''}`}>
                      <ChevronDownIcon className="w-5 h-5 text-slate-500" />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${expandedModules[module.id] ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <ul className="divide-y divide-slate-100 dark:divide-slate-800/50">
                      {module.lectures?.map((lecture, index) => (
                        <li key={lecture.contentDetails?.videoId}>
                          <Link
                            to={APP_ROUTES.courseContent.replace(':courseId', course.id).replace(':lectureId', lecture.contentDetails?.videoId)}
                            className="group flex items-center justify-between p-4 sm:px-6 sm:py-5 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {index + 1}
                              </div>
                              <div className="flex items-center space-x-3">
                                <VideoCameraIcon className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{lecture.snippet?.title}</span>
                              </div>
                            </div>
                            <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{lecture.duration || 'Video'}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Testimonials */}
          {testimonials.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Student Feedback</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map(testimonial => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar: Instructor */}
        <aside className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/50 dark:border-slate-800/60 sticky top-24 space-y-6"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">About the Instructor</h3>
            <div className="flex items-center space-x-5">
              <img src={course.instructorProfileImageUrl} alt={course.istructorName} className="w-20 h-20 rounded-full border-4 border-indigo-50 dark:border-indigo-500/20 shadow-sm" />
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{course.istructorName}</h4>
                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mt-1">Lead Instructor</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {course.istructorName} is a seasoned software engineer with over 10 years of experience, specializing in {course.category[0]}.
            </p>

            {/* Social / Contact Mock */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <button className="w-full py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                View Full Profile
              </button>
            </div>
          </motion.div>
        </aside>
      </div>
    </div>
  );
};

export default CourseOverviewPage;
