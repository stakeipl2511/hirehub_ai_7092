import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const LearningProgress = ({ onNavigate }) => {
  const [celebrationActive, setCelebrationActive] = useState(false);

  const learningData = [
    {
      id: 1,
      title: "Advanced React Patterns",
      category: "Frontend Development",
      progress: 85,
      totalLessons: 12,
      completedLessons: 10,
      estimatedTime: "2h remaining",
      difficulty: "Advanced",
      instructor: "Sarah Chen",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      isActive: true,
      nextLesson: "Custom Hooks Deep Dive",
      certificate: false
    },
    {
      id: 2,
      title: "TypeScript Fundamentals",
      category: "Programming Languages",
      progress: 100,
      totalLessons: 8,
      completedLessons: 8,
      estimatedTime: "Completed",
      difficulty: "Intermediate",
      instructor: "Mike Johnson",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
      isActive: false,
      nextLesson: null,
      certificate: true
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      category: "Backend Development",
      progress: 45,
      totalLessons: 15,
      completedLessons: 7,
      estimatedTime: "6h remaining",
      difficulty: "Intermediate",
      instructor: "Alex Rodriguez",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop",
      isActive: false,
      nextLesson: "Express.js Middleware",
      certificate: false
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Fast Learner",
      description: "Completed 3 courses this month",
      icon: "Zap",
      color: "warning",
      earned: true,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Certified Developer",
      description: "Earned 5 certificates",
      icon: "Award",
      color: "success",
      earned: true,
      date: "2024-01-10"
    },
    {
      id: 3,
      title: "Streak Master",
      description: "7-day learning streak",
      icon: "Flame",
      color: "error",
      earned: false,
      progress: 5
    }
  ];

  const totalProgress = Math.round(
    learningData.reduce((acc, course) => acc + course.progress, 0) / learningData.length
  );

  useEffect(() => {
    const hasCompletedCourse = learningData.some(course => course.progress === 100);
    if (hasCompletedCourse && !celebrationActive) {
      setCelebrationActive(true);
      setTimeout(() => setCelebrationActive(false), 3000);
    }
  }, [celebrationActive]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success bg-success/10';
      case 'Intermediate': return 'text-warning bg-warning/10';
      case 'Advanced': return 'text-error bg-error/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const getAchievementColor = (color) => {
    switch (color) {
      case 'warning': return 'text-warning bg-warning/10';
      case 'success': return 'text-success bg-success/10';
      case 'error': return 'text-error bg-error/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Learning Progress
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="BookOpen"
          iconPosition="left"
          onClick={() => onNavigate('/learning-hub')}
        >
          Browse Courses
        </Button>
      </div>

      {/* Overall Progress */}
      <div className="glass-card p-6 relative overflow-hidden">
        {celebrationActive && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 right-4 animate-sparkle text-2xl">🎉</div>
            <div className="absolute bottom-4 left-4 animate-sparkle text-xl" style={{ animationDelay: '0.5s' }}>✨</div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-base font-semibold text-text-primary mb-1">
              Overall Learning Progress
            </h4>
            <p className="text-sm text-text-secondary">
              {learningData.length} courses in progress
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {totalProgress}%
            </div>
            <div className="text-xs text-text-secondary">
              Average completion
            </div>
          </div>
        </div>

        <ProgressIndicator
          currentStep={totalProgress}
          totalSteps={100}
          variant="linear"
          showLabels={false}
          showPercentage={false}
          animated={true}
          color="primary"
        />

        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="text-text-secondary">
            Keep up the great work!
          </span>
          <Button
            variant="ghost"
            size="xs"
            iconName="TrendingUp"
            iconPosition="left"
            onClick={() => onNavigate('/learning-analytics')}
          >
            View Analytics
          </Button>
        </div>
      </div>

      {/* Active Courses */}
      <div className="space-y-4">
        <h4 className="text-base font-semibold text-text-primary">
          Current Courses
        </h4>
        
        {learningData.map((course) => (
          <div
            key={course.id}
            className={`
              glass-card p-6 hover-lift transition-all duration-300 cursor-pointer
              ${course.isActive ? 'ring-2 ring-primary/20 shadow-glass-primary' : 'hover:shadow-glow'}
            `}
            onClick={() => onNavigate(`/course/${course.id}`)}
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-32 h-20 lg:h-24 rounded-xl overflow-hidden bg-surface flex-shrink-0">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h5 className="text-base font-semibold text-text-primary mb-1">
                      {course.title}
                    </h5>
                    <p className="text-sm text-text-secondary mb-2">
                      {course.category} • {course.instructor}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${getDifficultyColor(course.difficulty)}
                      `}>
                        {course.difficulty}
                      </span>
                      {course.certificate && (
                        <div className="flex items-center gap-1 text-success">
                          <Icon name="Award" size={12} />
                          <span className="text-xs font-medium">Certified</span>
                        </div>
                      )}
                      {course.isActive && (
                        <div className="flex items-center gap-1 text-primary">
                          <Icon name="Play" size={12} />
                          <span className="text-xs font-medium">Active</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {course.progress}%
                    </div>
                    <div className="text-xs text-text-secondary">
                      {course.completedLessons}/{course.totalLessons} lessons
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <ProgressIndicator
                    currentStep={course.progress}
                    totalSteps={100}
                    variant="linear"
                    showLabels={false}
                    showPercentage={false}
                    animated={true}
                    color={course.progress === 100 ? 'success' : 'primary'}
                    size="sm"
                  />

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">
                      {course.nextLesson ? `Next: ${course.nextLesson}` : course.estimatedTime}
                    </span>
                    <span className="text-text-tertiary">
                      {course.estimatedTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="space-y-4">
        <h4 className="text-base font-semibold text-text-primary">
          Recent Achievements
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`
                glass-card p-4 text-center transition-all duration-300
                ${achievement.earned 
                  ? 'hover-lift hover:shadow-glow' 
                  : 'opacity-60 hover:opacity-80'
                }
              `}
            >
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3
                ${getAchievementColor(achievement.color)}
                ${achievement.earned ? 'animate-pulse' : ''}
              `}>
                <Icon 
                  name={achievement.icon} 
                  size={24} 
                  className={achievement.earned ? '' : 'opacity-50'}
                />
              </div>

              <h5 className="text-sm font-semibold text-text-primary mb-1">
                {achievement.title}
              </h5>
              <p className="text-xs text-text-secondary mb-2">
                {achievement.description}
              </p>

              {achievement.earned ? (
                <div className="text-xs text-success font-medium">
                  Earned {new Date(achievement.date).toLocaleDateString()}
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-xs text-text-tertiary">
                    Progress: {achievement.progress}/7
                  </div>
                  <div className="w-full bg-background-secondary rounded-full h-1">
                    <div 
                      className="bg-primary h-1 rounded-full transition-all duration-300"
                      style={{ width: `${(achievement.progress / 7) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button
          variant="primary"
          iconName="BookOpen"
          iconPosition="left"
          onClick={() => onNavigate('/learning-hub')}
        >
          Explore More Courses
        </Button>
      </div>
    </div>
  );
};

export default LearningProgress;