import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdaptiveHeader from '../../components/ui/AdaptiveHeader';
import StepIndicator from './components/StepIndicator';
import CareerGoalsStep from './components/CareerGoalsStep';
import SkillsAssessmentStep from './components/SkillsAssessmentStep';
import ResumeUploadStep from './components/ResumeUploadStep';
import PreferencesStep from './components/PreferencesStep';
import PrivacyStep from './components/PrivacyStep';
import Icon from '../../components/AppIcon';

const JobSeekerOnboardingWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    careerGoals: {},
    skillsAssessment: {},
    resumeUpload: {},
    preferences: {},
    privacy: {}
  });
  const [isCompleting, setIsCompleting] = useState(false);

  const totalSteps = 5;
  const steps = [
    'Career Goals',
    'Skills Assessment', 
    'Resume Upload',
    'Preferences',
    'Privacy Settings'
  ];

  useEffect(() => {
    // Check if user is authenticated
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/authentication-portal');
      return;
    }

    // Load saved progress
    const savedProgress = localStorage.getItem('onboardingProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setFormData(progress.formData || formData);
        setCurrentStep(progress.currentStep || 1);
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, [navigate]);

  const saveProgress = (stepData, step) => {
    const updatedFormData = {
      ...formData,
      [getStepKey(step)]: stepData
    };
    
    setFormData(updatedFormData);
    
    // Save to localStorage
    const progressData = {
      formData: updatedFormData,
      currentStep: step,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('onboardingProgress', JSON.stringify(progressData));
  };

  const getStepKey = (step) => {
    const stepKeys = {
      1: 'careerGoals',
      2: 'skillsAssessment',
      3: 'resumeUpload',
      4: 'preferences',
      5: 'privacy'
    };
    return stepKeys[step];
  };

  const handleStepUpdate = (stepData) => {
    saveProgress(stepData, currentStep);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step) => {
    // Allow navigation to previous steps or current step
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    
    try {
      // Simulate API call to save onboarding data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mark onboarding as complete
      localStorage.setItem('onboardingCompleted', 'true');
      localStorage.removeItem('onboardingProgress');
      
      // Update user data
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const updatedUserData = {
        ...userData,
        onboardingCompleted: true,
        profile: {
          ...userData.profile,
          ...formData
        }
      };
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      
      // Navigate to dashboard
      navigate('/job-seeker-dashboard');
      
    } catch (error) {
      console.error('Error completing onboarding:', error);
      setIsCompleting(false);
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      data: formData[getStepKey(currentStep)] || {},
      onUpdate: handleStepUpdate,
      onNext: handleNext,
      onPrev: handlePrev
    };

    switch (currentStep) {
      case 1:
        return <CareerGoalsStep {...stepProps} />;
      case 2:
        return <SkillsAssessmentStep {...stepProps} />;
      case 3:
        return <ResumeUploadStep {...stepProps} />;
      case 4:
        return <PreferencesStep {...stepProps} />;
      case 5:
        return <PrivacyStep {...stepProps} />;
      default:
        return <CareerGoalsStep {...stepProps} />;
    }
  };

  if (isCompleting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
            <Icon name="Sparkles" size={40} className="text-primary" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-text-primary">
              Completing Your Setup...
            </h2>
            <p className="text-text-secondary">
              We're personalizing your experience based on your preferences
            </p>
          </div>
          
          <div className="w-64 mx-auto">
            <div className="w-full bg-background-secondary rounded-full h-2">
              <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full animate-pulse w-full"></div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background">
      <AdaptiveHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Progress Header */}
        <div className="lg:hidden mb-8">
          <div className="glass-card p-4">
            <StepIndicator
              currentStep={currentStep}
              totalSteps={totalSteps}
              steps={steps}
              onStepClick={handleStepClick}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Setup Progress
                </h3>
                <StepIndicator
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                  steps={steps}
                  onStepClick={handleStepClick}
                />
              </div>
              
              <div className="glass-card p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Lightbulb" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-warning">Quick Tip</span>
                </div>
                <p className="text-sm text-text-secondary">
                  {currentStep === 1 && "Be specific about your career goals to get better job matches."}
                  {currentStep === 2 && "Honest skill assessment helps us recommend relevant opportunities."}
                  {currentStep === 3 && "Upload your latest resume for accurate skill extraction."}
                  {currentStep === 4 && "Set realistic preferences to find your ideal job."}
                  {currentStep === 5 && "Choose privacy settings that make you comfortable."}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="glass-card p-6 lg:p-8">
              {renderCurrentStep()}
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-accent/5 rounded-full blur-3xl animate-float animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default JobSeekerOnboardingWizard;