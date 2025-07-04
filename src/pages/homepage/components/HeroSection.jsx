import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    navigate('/authentication-portal');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50">
      {/* Animated 3D Fluid Wave Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 animate-wave"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Content */}
      <div className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gradient leading-tight">
              Your AI-Powered
              <br />
              Career Journey Starts Here
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Connect with opportunities, develop skills, and accelerate your career with intelligent matching and personalized guidance.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handleGetStarted}
              iconName="Rocket"
              iconPosition="right"
              className="hover-lift"
            >
              Get Started Free
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate('/about-contact')}
              iconName="Play"
              iconPosition="left"
              className="hover-lift"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 space-y-4">
            <p className="text-sm text-text-tertiary font-medium">
              Trusted by professionals at
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center space-x-2">
                <Icon name="Building2" size={20} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-secondary">500+ Companies</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-secondary">50K+ Job Seekers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={20} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-secondary">95% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-text-tertiary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-text-tertiary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;