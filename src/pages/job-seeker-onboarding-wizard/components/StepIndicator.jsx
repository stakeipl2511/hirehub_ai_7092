import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ currentStep, totalSteps, steps, onStepClick }) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full space-y-4">
      {/* Progress Bar */}
      <div className="relative">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text-primary">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-bold text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        
        <div className="relative w-full h-3 bg-background-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-comet" />
          </div>
        </div>
      </div>

      {/* Step Navigation - Desktop Only */}
      <div className="hidden lg:flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={`
                relative w-10 h-10 rounded-full border-2 transition-all duration-300
                flex items-center justify-center cursor-pointer group
                ${index + 1 < currentStep 
                  ? 'bg-primary border-primary text-white shadow-glass-primary' 
                  : index + 1 === currentStep
                    ? 'border-primary bg-surface text-primary shadow-glass-secondary animate-pulse'
                    : 'border-border bg-surface text-text-tertiary'
                }
                ${onStepClick ? 'hover:scale-110' : ''}
              `}
              onClick={() => onStepClick && onStepClick(index + 1)}
            >
              <span className="text-sm font-bold">
                {index + 1 < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  index + 1
                )}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-2 bg-background-secondary rounded-full overflow-hidden">
                <div
                  className={`
                    h-full bg-primary rounded-full transition-all duration-500
                    ${index + 1 < currentStep ? 'w-full' : 'w-0'}
                  `}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Step Labels - Desktop Only */}
      <div className="hidden lg:flex justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`
              text-center max-w-24 transition-colors duration-300
              ${index + 1 <= currentStep ? 'text-primary' : 'text-text-tertiary'}
            `}
          >
            <span className="text-xs font-medium block">
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;