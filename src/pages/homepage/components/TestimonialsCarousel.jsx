import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "TechCorp",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `HireHub AI transformed my job search completely. The AI matching was incredibly accurate, and I found my dream job within just 3 weeks. The skill development resources helped me prepare perfectly for interviews.`,
      rating: 5,
      category: "job-seeker"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "HR Director",
      company: "InnovateCorp",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `As a recruiter, I've never had access to such qualified candidates. The platform's screening tools and analytics have reduced our hiring time by 60% while improving candidate quality significantly.`,
      rating: 5,
      category: "recruiter"
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "Startup Founder",
      company: "GrowthLab",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `Building our team was challenging until we found HireHub AI. The platform helped us find talented individuals who perfectly matched our company culture and technical requirements.`,
      rating: 5,
      category: "employer"
    },
    {
      id: 4,
      name: "David Park",
      role: "Data Scientist",
      company: "Analytics Pro",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `The mentorship program connected me with industry experts who guided my career transition. The personalized learning paths and skill assessments were exactly what I needed to level up.`,
      rating: 5,
      category: "job-seeker"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Talent Acquisition Manager",
      company: "GlobalTech",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      content: `The collaborative features have revolutionized how our hiring team works together. Real-time updates, shared pipelines, and integrated communication make the entire process seamless.`,
      rating: 5,
      category: "recruiter"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'job-seeker': return 'text-primary';
      case 'recruiter': return 'text-secondary-500';
      case 'employer': return 'text-accent-500';
      default: return 'text-primary';
    }
  };

  const getCategoryBg = (category) => {
    switch (category) {
      case 'job-seeker': return 'bg-primary/10';
      case 'recruiter': return 'bg-secondary/10';
      case 'employer': return 'bg-accent/10';
      default: return 'bg-primary/10';
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Discover how professionals across different roles have transformed their careers with HireHub AI.
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial */}
          <div className="glass-card p-8 lg:p-12 mb-8 overflow-hidden">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-700 ${
                    index === currentIndex
                      ? 'opacity-100 translate-x-0'
                      : index < currentIndex
                      ? 'opacity-0 -translate-x-full absolute inset-0' :'opacity-0 translate-x-full absolute inset-0'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                    {/* Avatar and Info */}
                    <div className="flex-shrink-0 text-center lg:text-left">
                      <div className="relative inline-block">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-white/20 shadow-glass-primary"
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-surface">
                          <Icon name="Check" size={16} color="white" />
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <h4 className="text-lg font-heading font-bold text-text-primary">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {testimonial.role}
                        </p>
                        <p className="text-sm font-medium text-primary">
                          {testimonial.company}
                        </p>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryBg(testimonial.category)} ${getCategoryColor(testimonial.category)}`}>
                          {testimonial.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-6">
                      {/* Quote */}
                      <div className="relative">
                        <Icon name="Quote" size={32} className="text-primary/20 absolute -top-2 -left-2" />
                        <blockquote className="text-lg lg:text-xl text-text-primary leading-relaxed pl-8">
                          {testimonial.content}
                        </blockquote>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: testimonial.rating }, (_, i) => (
                          <Icon key={i} name="Star" size={20} className="text-warning fill-current" />
                        ))}
                        <span className="ml-2 text-sm text-text-secondary">
                          {testimonial.rating}.0 out of 5
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="p-3 rounded-full glass-surface hover:bg-white/20 transition-all duration-300 hover-lift focus-ring"
              aria-label="Previous testimonial"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary scale-125' :'bg-text-tertiary hover:bg-primary/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="p-3 rounded-full glass-surface hover:bg-white/20 transition-all duration-300 hover-lift focus-ring"
              aria-label="Next testimonial"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>

          {/* Auto-play Indicator */}
          <div className="flex items-center justify-center mt-6 space-x-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center space-x-2 text-sm text-text-secondary hover:text-primary transition-colors duration-300"
            >
              <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
              <span>{isAutoPlaying ? "Pause" : "Play"} Auto-scroll</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;