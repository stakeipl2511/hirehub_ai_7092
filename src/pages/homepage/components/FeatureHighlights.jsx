import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const FeatureHighlights = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const sectionRef = useRef(null);

  const features = [
    {
      id: 'ai-matching',
      title: 'AI-Powered Matching',
      description: 'Our advanced algorithms analyze skills, experience, and preferences to connect the right people with the right opportunities.',
      icon: 'Brain',
      gradient: 'from-primary to-primary-600',
      stats: '95% Match Accuracy',
      benefits: ['Personalized Recommendations', 'Smart Skill Analysis', 'Cultural Fit Assessment']
    },
    {
      id: 'skill-development',
      title: 'Skill Development',
      description: 'Access personalized learning paths, interactive assessments, and industry-recognized certifications to advance your career.',
      icon: 'GraduationCap',
      gradient: 'from-success to-success-600',
      stats: '10K+ Courses Available',
      benefits: ['Interactive Learning', 'Progress Tracking', 'Industry Certifications']
    },
    {
      id: 'mentorship',
      title: 'Expert Mentorship',
      description: 'Connect with industry professionals for guidance, career advice, and networking opportunities tailored to your goals.',
      icon: 'Users',
      gradient: 'from-secondary-500 to-secondary-600',
      stats: '500+ Expert Mentors',
      benefits: ['1-on-1 Sessions', 'Career Guidance', 'Industry Insights']
    },
    {
      id: 'analytics',
      title: 'Smart Analytics',
      description: 'Make data-driven decisions with comprehensive insights into hiring trends, skill gaps, and market opportunities.',
      icon: 'BarChart3',
      gradient: 'from-warning to-warning-600',
      stats: 'Real-time Insights',
      benefits: ['Market Trends', 'Performance Metrics', 'Predictive Analytics']
    },
    {
      id: 'collaboration',
      title: 'Team Collaboration',
      description: 'Streamline hiring processes with collaborative tools, shared pipelines, and integrated communication features.',
      icon: 'Users2',
      gradient: 'from-accent-500 to-accent-600',
      stats: '99% Team Satisfaction',
      benefits: ['Shared Workflows', 'Real-time Updates', 'Integrated Chat']
    },
    {
      id: 'security',
      title: 'Enterprise Security',
      description: 'Protect sensitive data with enterprise-grade security, compliance standards, and privacy controls.',
      icon: 'Shield',
      gradient: 'from-error to-error-600',
      stats: 'SOC 2 Compliant',
      benefits: ['Data Encryption', 'Privacy Controls', 'Audit Trails']
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-card-id');
            setVisibleCards(prev => new Set([...prev, cardId]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-card-id]');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary mb-4">
            Powerful Features for Every User
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Discover how our comprehensive platform transforms the way you approach career development, talent acquisition, and team building.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              data-card-id={feature.id}
              className={`
                glass-card p-8 hover-lift hover-glow transition-all duration-700 group
                ${visibleCards.has(feature.id) 
                  ? 'opacity-100 translate-y-0' :'opacity-0 translate-y-8'
                }
              `}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Icon Header */}
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-glass-primary group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={feature.icon} size={24} color="white" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {feature.stats}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-heading font-bold text-text-primary mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-text-secondary">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[1.25rem] pointer-events-none"></div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ transitionDelay: '200ms' }}>
                <div className="w-1 h-1 bg-secondary rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Active Users', value: '50K+', icon: 'Users' },
            { label: 'Job Matches', value: '100K+', icon: 'Target' },
            { label: 'Success Rate', value: '95%', icon: 'TrendingUp' },
            { label: 'Companies', value: '500+', icon: 'Building2' }
          ].map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="flex justify-center">
                <Icon name={stat.icon} size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;