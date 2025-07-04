import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacyStep = ({ data, onUpdate, onNext, onPrev }) => {
  const [profileVisibility, setProfileVisibility] = useState(data.profileVisibility || 'public');
  const [anonymousMode, setAnonymousMode] = useState(data.anonymousMode || false);
  const [dataSharing, setDataSharing] = useState(data.dataSharing || {});
  const [notifications, setNotifications] = useState(data.notifications || {});
  const [showConfetti, setShowConfetti] = useState(false);

  const visibilityOptions = [
    {
      id: 'public',
      name: 'Public Profile',
      description: 'Your profile is visible to all recruiters and employers',
      icon: 'Globe',
      benefits: ['Maximum job opportunities', 'Direct recruiter contact', 'Higher visibility']
    },
    {
      id: 'limited',
      name: 'Limited Visibility',
      description: 'Only verified recruiters can see your full profile',
      icon: 'Shield',
      benefits: ['Quality opportunities', 'Reduced spam', 'Professional contacts only']
    },
    {
      id: 'private',
      name: 'Private Profile',
      description: 'You control who can see your profile information',
      icon: 'Lock',
      benefits: ['Complete privacy control', 'Anonymous browsing', 'Selective sharing']
    }
  ];

  const dataSharingOptions = [
    {
      id: 'analytics',
      name: 'Usage Analytics',
      description: 'Help improve our platform by sharing anonymous usage data',
      icon: 'BarChart3',
      defaultValue: true
    },
    {
      id: 'recommendations',
      name: 'Job Recommendations',
      description: 'Allow us to use your data to provide better job matches',
      icon: 'Target',
      defaultValue: true
    },
    {
      id: 'marketing',
      name: 'Marketing Communications',
      description: 'Receive updates about new features and opportunities',
      icon: 'Mail',
      defaultValue: false
    },
    {
      id: 'third-party',
      name: 'Third-party Integrations',
      description: 'Share data with trusted partners for enhanced services',
      icon: 'Link',
      defaultValue: false
    }
  ];

  const notificationOptions = [
    {
      id: 'job-matches',
      name: 'Job Matches',
      description: 'Get notified when we find jobs that match your profile',
      icon: 'Briefcase',
      defaultValue: true
    },
    {
      id: 'recruiter-messages',
      name: 'Recruiter Messages',
      description: 'Receive notifications when recruiters contact you',
      icon: 'MessageSquare',
      defaultValue: true
    },
    {
      id: 'application-updates',
      name: 'Application Updates',
      description: 'Stay informed about your job application status',
      icon: 'Bell',
      defaultValue: true
    },
    {
      id: 'learning-reminders',
      name: 'Learning Reminders',
      description: 'Get reminders about skill development opportunities',
      icon: 'BookOpen',
      defaultValue: false
    },
    {
      id: 'weekly-digest',
      name: 'Weekly Digest',
      description: 'Receive a summary of your activity and new opportunities',
      icon: 'Calendar',
      defaultValue: false
    }
  ];

  const handleDataSharingToggle = (optionId) => {
    setDataSharing(prev => ({
      ...prev,
      [optionId]: !prev[optionId]
    }));
  };

  const handleNotificationToggle = (optionId) => {
    setNotifications(prev => ({
      ...prev,
      [optionId]: !prev[optionId]
    }));
  };

  const handleComplete = () => {
    const stepData = {
      profileVisibility,
      anonymousMode,
      dataSharing,
      notifications
    };
    onUpdate(stepData);
    
    // Trigger confetti animation
    setShowConfetti(true);
    
    // Complete onboarding after animation
    setTimeout(() => {
      onNext();
    }, 2000);
  };

  // Initialize default values
  React.useEffect(() => {
    const defaultDataSharing = {};
    const defaultNotifications = {};
    
    dataSharingOptions.forEach(option => {
      if (dataSharing[option.id] === undefined) {
        defaultDataSharing[option.id] = option.defaultValue;
      }
    });
    
    notificationOptions.forEach(option => {
      if (notifications[option.id] === undefined) {
        defaultNotifications[option.id] = option.defaultValue;
      }
    });
    
    if (Object.keys(defaultDataSharing).length > 0) {
      setDataSharing(prev => ({ ...prev, ...defaultDataSharing }));
    }
    
    if (Object.keys(defaultNotifications).length > 0) {
      setNotifications(prev => ({ ...prev, ...defaultNotifications }));
    }
  }, []);

  return (
    <div className="space-y-8 relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
          <div className="absolute top-1/4 left-1/4 text-4xl animate-sparkle">✨</div>
          <div className="absolute top-1/3 right-1/4 text-4xl animate-sparkle animation-delay-300">🎊</div>
          <div className="absolute bottom-1/3 left-1/3 text-4xl animate-sparkle animation-delay-600">⭐</div>
          <div className="absolute bottom-1/4 right-1/3 text-4xl animate-sparkle animation-delay-900">🌟</div>
        </div>
      )}

      <div className="text-center space-y-2">
        <h2 className="text-2xl lg:text-3xl font-heading font-bold text-gradient">
          Privacy & Preferences
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Configure your privacy settings and notification preferences to control how you interact with our platform.
        </p>
      </div>

      {/* Profile Visibility */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">
            Profile Visibility
          </h3>
        </div>

        <div className="grid gap-4">
          {visibilityOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setProfileVisibility(option.id)}
              className={`
                glass-card p-6 text-left transition-all duration-300 border
                ${profileVisibility === option.id
                  ? 'border-primary bg-primary/10 shadow-glass-primary'
                  : 'border-white/20 hover:border-primary/50 hover:bg-primary/5'
                }
                hover:scale-[1.02]
              `}
            >
              <div className="flex items-start space-x-4">
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center
                  ${profileVisibility === option.id ? 'bg-primary/20' : 'bg-background-secondary'}
                `}>
                  <Icon 
                    name={option.icon} 
                    size={24} 
                    className={profileVisibility === option.id ? 'text-primary' : 'text-text-secondary'} 
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-text-primary">{option.name}</h4>
                    {profileVisibility === option.id && (
                      <Icon name="Check" size={20} className="text-primary" />
                    )}
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-3">
                    {option.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {option.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-success/10 text-success rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Anonymous Mode */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="UserX" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">
            Anonymous Browsing
          </h3>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-text-primary mb-2">
                Enable Anonymous Mode
              </h4>
              <p className="text-sm text-text-secondary">
                Browse jobs and company profiles without revealing your identity. 
                Your profile views won't be tracked by employers.
              </p>
            </div>
            
            <button
              onClick={() => setAnonymousMode(!anonymousMode)}
              className={`
                relative w-12 h-6 rounded-full transition-all duration-300
                ${anonymousMode ? 'bg-primary' : 'bg-background-secondary'}
              `}
            >
              <div className={`
                absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300
                ${anonymousMode ? 'translate-x-6' : 'translate-x-0.5'}
              `} />
            </button>
          </div>
        </div>
      </div>

      {/* Data Sharing Preferences */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Database" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">
            Data Sharing Preferences
          </h3>
        </div>

        <div className="space-y-3">
          {dataSharingOptions.map((option) => (
            <div key={option.id} className="glass-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Icon name={option.icon} size={20} className="text-text-secondary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-text-primary">{option.name}</h4>
                    <p className="text-sm text-text-secondary">{option.description}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDataSharingToggle(option.id)}
                  className={`
                    relative w-10 h-5 rounded-full transition-all duration-300 ml-4
                    ${dataSharing[option.id] ? 'bg-primary' : 'bg-background-secondary'}
                  `}
                >
                  <div className={`
                    absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300
                    ${dataSharing[option.id] ? 'translate-x-5' : 'translate-x-0.5'}
                  `} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">
            Notification Preferences
          </h3>
        </div>

        <div className="space-y-3">
          {notificationOptions.map((option) => (
            <div key={option.id} className="glass-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Icon name={option.icon} size={20} className="text-text-secondary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-text-primary">{option.name}</h4>
                    <p className="text-sm text-text-secondary">{option.description}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleNotificationToggle(option.id)}
                  className={`
                    relative w-10 h-5 rounded-full transition-all duration-300 ml-4
                    ${notifications[option.id] ? 'bg-primary' : 'bg-background-secondary'}
                  `}
                >
                  <div className={`
                    absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300
                    ${notifications[option.id] ? 'translate-x-5' : 'translate-x-0.5'}
                  `} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Summary */}
      <div className="glass-card p-6 bg-primary/5 border-primary/20">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Shield" size={20} className="text-primary" />
          <h4 className="font-semibold text-primary">Privacy Summary</h4>
        </div>
        
        <div className="space-y-2 text-sm text-text-secondary">
          <p>• Profile visibility: <span className="font-medium text-text-primary">{visibilityOptions.find(opt => opt.id === profileVisibility)?.name}</span></p>
          <p>• Anonymous browsing: <span className="font-medium text-text-primary">{anonymousMode ? 'Enabled' : 'Disabled'}</span></p>
          <p>• Data sharing options: <span className="font-medium text-text-primary">{Object.values(dataSharing).filter(Boolean).length} enabled</span></p>
          <p>• Notification types: <span className="font-medium text-text-primary">{Object.values(notifications).filter(Boolean).length} enabled</span></p>
        </div>
        
        <div className="mt-4 p-3 bg-white/10 rounded-lg">
          <p className="text-xs text-text-secondary">
            You can change these settings anytime from your account preferences. 
            We're committed to protecting your privacy and giving you control over your data.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={onPrev}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Previous
        </Button>
        
        <Button
          variant="primary"
          onClick={handleComplete}
          iconName="Check"
          iconPosition="right"
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
        >
          Complete Setup
        </Button>
      </div>
    </div>
  );
};

export default PrivacyStep;