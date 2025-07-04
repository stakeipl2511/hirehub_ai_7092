import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const ProfileSummaryCard = ({ user, onEditProfile }) => {
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [celebrationActive, setCelebrationActive] = useState(false);

  useEffect(() => {
    // Calculate profile completion based on user data
    const fields = [
      user?.name,
      user?.email,
      user?.phone,
      user?.location,
      user?.bio,
      user?.skills?.length > 0,
      user?.experience?.length > 0,
      user?.education?.length > 0,
      user?.resume
    ];
    
    const completedFields = fields.filter(Boolean).length;
    const percentage = Math.round((completedFields / fields.length) * 100);
    
    setTimeout(() => {
      setCompletionPercentage(percentage);
    }, 500);

    if (percentage === 100 && !celebrationActive) {
      setCelebrationActive(true);
      setTimeout(() => setCelebrationActive(false), 3000);
    }
  }, [user, celebrationActive]);

  const getCompletionMessage = () => {
    if (completionPercentage === 100) return "Profile Complete! 🎉";
    if (completionPercentage >= 80) return "Almost there!";
    if (completionPercentage >= 60) return "Good progress";
    if (completionPercentage >= 40) return "Getting started";
    return "Let's build your profile";
  };

  const getNextSteps = () => {
    const steps = [];
    if (!user?.bio) steps.push("Add professional summary");
    if (!user?.skills?.length) steps.push("Add your skills");
    if (!user?.experience?.length) steps.push("Add work experience");
    if (!user?.resume) steps.push("Upload your resume");
    return steps.slice(0, 2); // Show max 2 next steps
  };

  return (
    <div className="glass-card p-6 hover-lift relative overflow-hidden">
      {celebrationActive && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 animate-sparkle text-2xl">🎉</div>
          <div className="absolute top-6 right-6 animate-sparkle text-xl" style={{ animationDelay: '0.5s' }}>✨</div>
          <div className="absolute bottom-4 left-1/2 animate-sparkle text-lg" style={{ animationDelay: '1s' }}>🌟</div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-secondary p-0.5">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name || 'Profile'}
                className="w-full h-full rounded-2xl object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
            )}
          </div>
          
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full border-4 border-surface flex items-center justify-center">
            <Icon name="Check" size={16} color="white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-1">
                {user?.name || 'Complete Your Profile'}
              </h2>
              <p className="text-text-secondary mb-2">
                {user?.title || 'Add your professional title'}
              </p>
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <Icon name="MapPin" size={16} />
                <span>{user?.location || 'Add your location'}</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              iconName="Edit3"
              iconPosition="left"
              onClick={onEditProfile}
              className="self-start sm:self-center"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-primary">
            Profile Completion
          </span>
          <span className="text-sm font-bold text-primary">
            {completionPercentage}%
          </span>
        </div>

        <ProgressIndicator
          currentStep={completionPercentage}
          totalSteps={100}
          variant="linear"
          showLabels={false}
          showPercentage={false}
          animated={true}
          color="primary"
        />

        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">
            {getCompletionMessage()}
          </span>
          {completionPercentage < 100 && (
            <Button
              variant="ghost"
              size="xs"
              iconName="ArrowRight"
              iconPosition="right"
              onClick={onEditProfile}
            >
              Complete
            </Button>
          )}
        </div>

        {getNextSteps().length > 0 && (
          <div className="mt-4 p-4 bg-accent/20 rounded-xl border border-accent/30">
            <h4 className="text-sm font-semibold text-text-primary mb-2">
              Next Steps:
            </h4>
            <ul className="space-y-1">
              {getNextSteps().map((step, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-text-secondary">
                  <Icon name="Circle" size={12} className="text-primary" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSummaryCard;