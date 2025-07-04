import React, { useEffect } from 'react';
import AdaptiveHeader from '../../components/ui/AdaptiveHeader';
import HeroSection from './components/HeroSection';
import RoleBasedCTACards from './components/RoleBasedCTACards';
import FeatureHighlights from './components/FeatureHighlights';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

const Homepage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'HireHub AI - Your AI-Powered Career Journey Starts Here';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Transform your career with HireHub AI. Connect with opportunities, develop skills, and accelerate your professional growth through intelligent matching and personalized guidance.');
    }

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AdaptiveHeader />
      
      <main className="relative">
        {/* Hero Section with 3D Fluid Wave Background */}
        <HeroSection />
        
        {/* Role-based CTA Cards */}
        <RoleBasedCTACards />
        
        {/* Feature Highlights with Glassmorphic Cards */}
        <FeatureHighlights />
        
        {/* Testimonials Carousel with Blob-morphing Transitions */}
        <TestimonialsCarousel />
        
        {/* About Section with Mission Statement and Team Preview */}
        <AboutSection />
      </main>
      
      {/* Footer with Social Icons and Newsletter Signup */}
      <Footer />
    </div>
  );
};

export default Homepage;