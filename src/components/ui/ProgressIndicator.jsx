import React, { useState, useEffect } from 'react';

const ProgressIndicator = ({
  currentStep = 0,
  totalSteps = 5,
  steps = [],
  variant = 'linear',
  showLabels = true,
  showPercentage = true,
  animated = true,
  size = 'md',
  color = 'primary',
  onStepClick,
  className = ''
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [celebrationActive, setCelebrationActive] = useState(false);

  const progress = Math.min((currentStep / totalSteps) * 100, 100);
  const isComplete = currentStep >= totalSteps;

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedProgress(progress);
    }
  }, [progress, animated]);

  useEffect(() => {
    if (isComplete && animated) {
      setCelebrationActive(true);
      const timer = setTimeout(() => {
        setCelebrationActive(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, animated]);

  const sizeClasses = {
    sm: {
      height: 'h-2',
      stepSize: 'w-6 h-6',
      fontSize: 'text-xs',
      spacing: 'space-y-2'
    },
    md: {
      height: 'h-3',
      stepSize: 'w-8 h-8',
      fontSize: 'text-sm',
      spacing: 'space-y-3'
    },
    lg: {
      height: 'h-4',
      stepSize: 'w-10 h-10',
      fontSize: 'text-base',
      spacing: 'space-y-4'
    }
  };

  const colorClasses = {
    primary: {
      bg: 'bg-primary',
      text: 'text-primary',
      border: 'border-primary'
    },
    success: {
      bg: 'bg-success',
      text: 'text-success',
      border: 'border-success'
    },
    warning: {
      bg: 'bg-warning',
      text: 'text-warning',
      border: 'border-warning'
    },
    secondary: {
      bg: 'bg-secondary',
      text: 'text-secondary',
      border: 'border-secondary'
    },
    error: {
      bg: 'bg-error',
      text: 'text-error',
      border: 'border-error'
    }
  };

  const currentSize = sizeClasses[size];
  const currentColor = colorClasses[color] || colorClasses.primary;

  const LinearProgress = () => (
    <div className={`w-full ${currentSize.spacing} ${className}`}>
      {showPercentage && (
        <div className="flex justify-between items-center mb-2">
          <span className={`${currentSize.fontSize} font-medium text-text-primary`}>
            Progress
          </span>
          <span className={`${currentSize.fontSize} font-bold ${currentColor.text}`}>
            {Math.round(animatedProgress)}%
          </span>
        </div>
      )}
      
      <div className={`relative w-full ${currentSize.height} bg-background-secondary rounded-full overflow-hidden`}>
        <div
          className={`
            ${currentSize.height} ${currentColor.bg} rounded-full transition-all duration-1000 ease-out
            relative overflow-hidden
            ${celebrationActive ? 'animate-glow' : ''}
          `}
          style={{ width: `${animatedProgress}%` }}
        >
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-comet" />
          )}
        </div>
        
        {celebrationActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-sparkle">✨</div>
          </div>
        )}
      </div>
      
      {showLabels && steps.length > 0 && (
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <span
              key={index}
              className={`
                ${currentSize.fontSize} transition-colors duration-300
                ${index <= currentStep ? currentColor.text : 'text-text-tertiary'}
                ${index === currentStep ? 'font-semibold' : 'font-medium'}
              `}
            >
              {step}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  const StepProgress = () => (
    <div className={`${currentSize.spacing} ${className}`}>
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => (
          <React.Fragment key={index}>
            <div
              className={`
                relative ${currentSize.stepSize} rounded-full border-2 transition-all duration-300
                flex items-center justify-center cursor-pointer
                ${index < currentStep 
                  ? `${currentColor.bg} ${currentColor.border} text-white shadow-glass-primary` 
                  : index === currentStep
                    ? `${currentColor.border} bg-surface text-${color} shadow-glass-secondary animate-pulse`
                    : 'border-border bg-surface text-text-tertiary'
                }
                ${onStepClick ? 'hover:scale-110' : ''}
                ${celebrationActive && index === currentStep - 1 ? 'animate-bounce' : ''}
              `}
              onClick={() => onStepClick && onStepClick(index)}
            >
              <span className={`${currentSize.fontSize} font-bold`}>
                {index < currentStep ? '✓' : index + 1}
              </span>
              
              {celebrationActive && index === currentStep - 1 && (
                <div className="absolute -top-2 -right-2 animate-sparkle text-warning">
                  ✨
                </div>
              )}
            </div>
            
            {index < totalSteps - 1 && (
              <div className={`flex-1 ${currentSize.height} mx-2 bg-background-secondary rounded-full overflow-hidden`}>
                <div
                  className={`
                    ${currentSize.height} ${currentColor.bg} rounded-full transition-all duration-500
                    ${index < currentStep ? 'w-full' : 'w-0'}
                  `}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {showLabels && steps.length > 0 && (
        <div className="flex justify-between mt-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`
                text-center max-w-20 transition-colors duration-300
                ${index <= currentStep ? currentColor.text : 'text-text-tertiary'}
              `}
            >
              <span className={`${currentSize.fontSize} font-medium block`}>
                {step}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const CircularProgress = () => {
    const radius = size === 'sm' ? 40 : size === 'md' ? 50 : 60;
    const strokeWidth = size === 'sm' ? 4 : size === 'md' ? 6 : 8;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg
          className="transform -rotate-90"
          width={radius * 2 + strokeWidth * 2}
          height={radius * 2 + strokeWidth * 2}
        >
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-background-secondary"
          />
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${currentColor.text} transition-all duration-1000 ease-out`}
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${currentSize.fontSize} font-bold ${currentColor.text}`}>
            {Math.round(animatedProgress)}%
          </span>
        </div>
        
        {celebrationActive && (
          <div className="absolute inset-0 flex items-center justify-center animate-sparkle">
            <span className="text-2xl">🎉</span>
          </div>
        )}
      </div>
    );
  };

  switch (variant) {
    case 'steps':
      return <StepProgress />;
    case 'circular':
      return <CircularProgress />;
    default:
      return <LinearProgress />;
  }
};

export default ProgressIndicator;