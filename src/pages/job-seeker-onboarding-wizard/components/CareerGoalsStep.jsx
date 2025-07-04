import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CareerGoalsStep = ({ data, onUpdate, onNext, onPrev }) => {
  const [selectedIndustries, setSelectedIndustries] = useState(data.industries || []);
  const [selectedRoles, setSelectedRoles] = useState(data.roles || []);
  const [experienceLevel, setExperienceLevel] = useState(data.experienceLevel || '');
  const [careerGoals, setCareerGoals] = useState(data.careerGoals || []);

  const industries = [
    { id: 'technology', name: 'Technology', icon: 'Laptop' },
    { id: 'healthcare', name: 'Healthcare', icon: 'Heart' },
    { id: 'finance', name: 'Finance', icon: 'DollarSign' },
    { id: 'education', name: 'Education', icon: 'GraduationCap' },
    { id: 'marketing', name: 'Marketing', icon: 'Megaphone' },
    { id: 'design', name: 'Design', icon: 'Palette' },
    { id: 'sales', name: 'Sales', icon: 'TrendingUp' },
    { id: 'consulting', name: 'Consulting', icon: 'Users' },
    { id: 'manufacturing', name: 'Manufacturing', icon: 'Factory' },
    { id: 'retail', name: 'Retail', icon: 'ShoppingBag' },
    { id: 'media', name: 'Media', icon: 'Camera' },
    { id: 'nonprofit', name: 'Non-Profit', icon: 'Heart' }
  ];

  const roleTypes = [
    { id: 'individual-contributor', name: 'Individual Contributor', icon: 'User' },
    { id: 'team-lead', name: 'Team Lead', icon: 'Users' },
    { id: 'manager', name: 'Manager', icon: 'Crown' },
    { id: 'director', name: 'Director', icon: 'Shield' },
    { id: 'executive', name: 'Executive', icon: 'Star' },
    { id: 'consultant', name: 'Consultant', icon: 'Briefcase' },
    { id: 'freelancer', name: 'Freelancer', icon: 'Zap' },
    { id: 'entrepreneur', name: 'Entrepreneur', icon: 'Rocket' }
  ];

  const experienceLevels = [
    { id: 'entry', name: 'Entry Level (0-2 years)', description: 'Just starting your career journey' },
    { id: 'junior', name: 'Junior (2-4 years)', description: 'Building foundational skills' },
    { id: 'mid', name: 'Mid-Level (4-7 years)', description: 'Experienced professional' },
    { id: 'senior', name: 'Senior (7-10 years)', description: 'Subject matter expert' },
    { id: 'lead', name: 'Lead/Principal (10+ years)', description: 'Industry leader and mentor' }
  ];

  const goalOptions = [
    { id: 'career-growth', name: 'Career Growth', icon: 'TrendingUp' },
    { id: 'skill-development', name: 'Skill Development', icon: 'BookOpen' },
    { id: 'work-life-balance', name: 'Work-Life Balance', icon: 'Scale' },
    { id: 'higher-salary', name: 'Higher Salary', icon: 'DollarSign' },
    { id: 'leadership-role', name: 'Leadership Role', icon: 'Crown' },
    { id: 'remote-work', name: 'Remote Work', icon: 'Home' },
    { id: 'startup-experience', name: 'Startup Experience', icon: 'Rocket' },
    { id: 'industry-change', name: 'Industry Change', icon: 'RefreshCw' }
  ];

  const toggleSelection = (item, selectedItems, setSelectedItems, maxSelection = null) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else if (!maxSelection || selectedItems.length < maxSelection) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleNext = () => {
    const stepData = {
      industries: selectedIndustries,
      roles: selectedRoles,
      experienceLevel,
      careerGoals
    };
    onUpdate(stepData);
    onNext();
  };

  const isValid = selectedIndustries.length > 0 && selectedRoles.length > 0 && experienceLevel && careerGoals.length > 0;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl lg:text-3xl font-heading font-bold text-gradient">
          Define Your Career Goals
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Help us understand your career aspirations so we can provide personalized job recommendations and growth opportunities.
        </p>
      </div>

      {/* Industries Selection */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Building2" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">
            Preferred Industries
          </h3>
          <span className="text-sm text-text-secondary">
            (Select up to 3)
          </span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => toggleSelection(industry.id, selectedIndustries, setSelectedIndustries, 3)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${selectedIndustries.includes(industry.id)
                  ? 'border-primary bg-primary/10 text-primary shadow-glass-primary'
                  : 'border-border bg-surface hover:border-primary/50 hover:bg-primary/5'
                }
                ${selectedIndustries.length >= 3 && !selectedIndustries.includes(industry.id) 
                  ? 'opacity-50 cursor-not-allowed' :'hover:scale-105'
                }
              `}
              disabled={selectedIndustries.length >= 3 && !selectedIndustries.includes(industry.id)}
            >
              <div className="flex items-center space-x-3">
                <Icon name={industry.icon} size={20} />
                <span className="font-medium text-sm">{industry.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Role Types Selection */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Briefcase" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">
            Role Types
          </h3>
          <span className="text-sm text-text-secondary">
            (Select up to 2)
          </span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {roleTypes.map((role) => (
            <button
              key={role.id}
              onClick={() => toggleSelection(role.id, selectedRoles, setSelectedRoles, 2)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${selectedRoles.includes(role.id)
                  ? 'border-primary bg-primary/10 text-primary shadow-glass-primary'
                  : 'border-border bg-surface hover:border-primary/50 hover:bg-primary/5'
                }
                ${selectedRoles.length >= 2 && !selectedRoles.includes(role.id) 
                  ? 'opacity-50 cursor-not-allowed' :'hover:scale-105'
                }
              `}
              disabled={selectedRoles.length >= 2 && !selectedRoles.includes(role.id)}
            >
              <div className="flex items-center space-x-3">
                <Icon name={role.icon} size={20} />
                <span className="font-medium text-sm">{role.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">
            Experience Level
          </h3>
        </div>
        
        <div className="space-y-3">
          {experienceLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => setExperienceLevel(level.id)}
              className={`
                w-full p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${experienceLevel === level.id
                  ? 'border-primary bg-primary/10 text-primary shadow-glass-primary'
                  : 'border-border bg-surface hover:border-primary/50 hover:bg-primary/5'
                }
                hover:scale-[1.02]
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{level.name}</div>
                  <div className="text-sm text-text-secondary mt-1">{level.description}</div>
                </div>
                {experienceLevel === level.id && (
                  <Icon name="Check" size={20} className="text-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Career Goals */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">
            Career Goals
          </h3>
          <span className="text-sm text-text-secondary">
            (Select all that apply)
          </span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {goalOptions.map((goal) => (
            <button
              key={goal.id}
              onClick={() => toggleSelection(goal.id, careerGoals, setCareerGoals)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${careerGoals.includes(goal.id)
                  ? 'border-primary bg-primary/10 text-primary shadow-glass-primary'
                  : 'border-border bg-surface hover:border-primary/50 hover:bg-primary/5'
                }
                hover:scale-105
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon name={goal.icon} size={20} />
                <span className="font-medium text-sm">{goal.name}</span>
              </div>
            </button>
          ))}
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
          onClick={handleNext}
          disabled={!isValid}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CareerGoalsStep;