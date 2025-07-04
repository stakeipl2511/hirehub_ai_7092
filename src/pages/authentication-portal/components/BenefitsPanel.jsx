import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BenefitsPanel = () => {
  const benefits = [
    {
      icon: 'Zap',
      title: 'AI-Powered Matching',
      description: 'Get matched with opportunities that align perfectly with your skills and career goals.'
    },
    {
      icon: 'TrendingUp',
      title: 'Career Growth',
      description: 'Access personalized learning paths and skill development recommendations.'
    },
    {
      icon: 'Users',
      title: 'Expert Mentorship',
      description: 'Connect with industry professionals and get guidance from experienced mentors.'
    },
    {
      icon: 'Award',
      title: 'Skill Certification',
      description: 'Earn verified certificates and showcase your expertise to potential employers.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      quote: 'HireHub AI helped me land my dream job in just 2 weeks!'
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      quote: 'The AI matching is incredibly accurate. Highly recommended!'
    }
  ];

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-12 flex-col justify-center">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto shadow-glass-primary">
            <Icon name="Sparkles" size={32} color="white" />
          </div>
          <h2 className="text-3xl font-bold text-gradient">
            Welcome to HireHub AI
          </h2>
          <p className="text-text-secondary text-lg">
            Your intelligent career companion powered by AI
          </p>
        </div>

        <div className="space-y-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 glass-surface rounded-xl hover-lift"
            >
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={benefit.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary text-center">
            Trusted by professionals
          </h3>
          <div className="space-y-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass-surface p-4 rounded-xl"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-text-primary">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-text-secondary italic">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2 text-text-secondary">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
            ))}
          </div>
          <span className="text-sm">4.9/5 from 10,000+ users</span>
        </div>
      </div>
    </div>
  );
};

export default BenefitsPanel;