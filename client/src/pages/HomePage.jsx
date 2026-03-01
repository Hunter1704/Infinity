import React from 'react';

import HeroSection from '../components/HomePage/HeroSection';
import FeaturesSection from '../components/HomePage/FeaturesSection';
import ProblemHighlights from '../components/HomePage/ProblemHighlights';
import FeaturedCoursesSection from '../components/HomePage/FeaturedCourseSection';
import CallToActionSection from '../components/HomePage/CallToActionSection';

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProblemHighlights />
       <FeaturedCoursesSection />
      <CallToActionSection />
    </>
  );
};

export default HomePage;