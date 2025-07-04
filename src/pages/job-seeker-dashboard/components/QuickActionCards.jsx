import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCards = ({ onNavigate }) => {
  const quickActions = [
    {
      id: 'job-search',
      title: 'Find Jobs',
      description: 'Discover personalized job matches',
      icon: 'Search',
      color: 'from-primary to-primary-600',
      textColor: 'text-white',
      action: () => onNavigate('/job-search'),
      stats: '2,847 new jobs',
      badge: 'Hot'
    },
    {
      id: 'skill-assessment',
      title: 'Skill Assessment',
      description: 'Test your abilities and get certified',
      icon: 'Award',
      color: 'from-success to-success-600',
      textColor: 'text-white',
      action: () => onNavigate('/skill-assessment'),
      stats: '15 assessments available',
      badge: 'New'
    },
    {
      id: 'learning',
      title: 'Learning Hub',
      description: 'Enhance skills with AI-curated courses',
      icon: 'BookOpen',
      color: 'from-warning to-warning-600',
      textColor: 'text-white',
      action: () => onNavigate('/learning-hub'),
      stats: '127 courses',
      badge: null
    },
    {
      id: 'mentorship',
      title: 'Find Mentors',
      description: 'Connect with industry experts',
      icon: 'Users',
      color: 'from-secondary-500 to-secondary-600',
      textColor: 'text-white',
      action: () => onNavigate('/mentorship'),
      stats: '89 mentors online',
      badge: null
    },
    {
      id: 'resume-builder',
      title: 'Resume Builder',
      description: 'Create ATS-optimized resumes',
      icon: 'FileText',
      color: 'from-accent-500 to-accent-600',
      textColor: 'text-white',
      action: () => onNavigate('/resume-builder'),
      stats: 'AI-powered',
      badge: 'Pro'
    },
    {
      id: 'interview-prep',
      title: 'Interview Prep',
      description: 'Practice with AI mock interviews',
      icon: 'MessageCircle',
      color: 'from-error-400 to-error-500',
      textColor: 'text-white',
      action: () => onNavigate('/interview-prep'),
      stats: '50+ questions',
      badge: null
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Quick Actions
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreHorizontal"
          onClick={() => onNavigate('/all-tools')}
        >
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <div
            key={action.id}
            className="group relative glass-card p-6 hover-lift cursor-pointer transition-all duration-300 hover:shadow-glow"
            onClick={action.action}
          >
            {action.badge && (
              <div className="absolute top-3 right-3 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                {action.badge}
              </div>
            )}

            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <Icon name={action.icon} size={24} color="white" />
            </div>

            <h4 className="text-base font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
              {action.title}
            </h4>

            <p className="text-sm text-text-secondary mb-3 line-clamp-2">
              {action.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-text-tertiary">
                {action.stats}
              </span>
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" 
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[1.25rem]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionCards;