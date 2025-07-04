import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoleBasedCTACards = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'job-seeker',
      title: 'Job Seekers',
      subtitle: 'Find Your Dream Career',
      description: 'Discover personalized job matches, develop skills, and get mentorship to accelerate your career growth.',
      icon: 'User',
      gradient: 'from-primary to-primary-600',
      features: ['AI-Powered Job Matching', 'Skill Development', 'Career Mentorship', 'Resume Optimization'],
      cta: 'Start Job Search',
      path: '/authentication-portal'
    },
    {
      id: 'recruiter',
      title: 'Recruiters',
      subtitle: 'Streamline Your Hiring',
      description: 'Access qualified candidates, manage applications efficiently, and make data-driven hiring decisions.',
      icon: 'Search',
      gradient: 'from-secondary-500 to-secondary-600',
      features: ['Candidate Screening', 'Application Management', 'Hiring Analytics', 'Team Collaboration'],
      cta: 'Find Talent',
      path: '/authentication-portal'
    },
    {
      id: 'employer',
      title: 'Employers',
      subtitle: 'Build Your Team',
      description: 'Post jobs, evaluate candidates, and build high-performing teams with our comprehensive platform.',
      icon: 'Building2',
      gradient: 'from-accent-500 to-accent-600',
      features: ['Job Posting', 'Candidate Evaluation', 'Team Building', 'Hiring Pipeline'],
      cta: 'Hire Now',
      path: '/authentication-portal'
    }
  ];

  const handleRoleSelect = (path) => {
    navigate(path);
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary mb-4">
            Choose Your Path
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Whether you're seeking opportunities, finding talent, or building teams, we have the perfect solution for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <div
              key={role.id}
              className={`glass-card p-8 hover-lift hover-glow transition-all duration-500 group cursor-pointer`}
              style={{ animationDelay: `${index * 200}ms` }}
              onClick={() => handleRoleSelect(role.path)}
            >
              {/* Icon Header */}
              <div className="flex items-center justify-center mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-glass-primary group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={role.icon} size={28} color="white" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center space-y-4">
                <div>
                  <h3 className="text-xl font-heading font-bold text-text-primary mb-2">
                    {role.title}
                  </h3>
                  <p className="text-sm font-medium text-primary mb-3">
                    {role.subtitle}
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    {role.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {role.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center justify-center space-x-2">
                      <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRoleSelect(role.path);
                    }}
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="w-full group-hover:scale-105 transition-transform duration-300"
                  >
                    {role.cta}
                  </Button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-text-secondary mb-6">
            Not sure which option is right for you?
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/about-contact')}
            iconName="HelpCircle"
            iconPosition="left"
          >
            Get Personalized Guidance
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoleBasedCTACards;