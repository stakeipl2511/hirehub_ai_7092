import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AdaptiveHeader from '../../components/ui/AdaptiveHeader';

// Import all dashboard components
import ProfileSummaryCard from './components/ProfileSummaryCard';
import QuickActionCards from './components/QuickActionCards';
import ApplicationTracker from './components/ApplicationTracker';
import NotificationsPreview from './components/NotificationsPreview';
import LearningProgress from './components/LearningProgress';
import MentorshipCard from './components/MentorshipCard';
import NavigationTabs from './components/NavigationTabs';

const JobSeekerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Frontend Developer",
    bio: "Passionate frontend developer with 3+ years of experience in React and modern web technologies. Looking to grow into a senior role with focus on system architecture.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    experience: [
      {
        company: "TechStart Inc",
        position: "Frontend Developer",
        duration: "2021 - Present"
      }
    ],
    education: [
      {
        institution: "University of California",
        degree: "BS Computer Science",
        year: "2021"
      }
    ],
    resume: "resume.pdf",
    role: "job-seeker"
  };

  useEffect(() => {
    // Check authentication and load user data
    const authToken = localStorage.getItem('authToken');
    const savedLanguage = localStorage.getItem('language') || 'en';
    
    setCurrentLanguage(savedLanguage);
    
    if (!authToken) {
      navigate('/authentication-portal');
      return;
    }

    // Simulate loading user data
    setTimeout(() => {
      setUser(mockUser);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleEditProfile = () => {
    navigate('/job-seeker-onboarding-wizard');
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdaptiveHeader />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
              Loading Dashboard
            </h2>
            <p className="text-text-secondary">
              Preparing your personalized experience...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Profile Summary */}
            <ProfileSummaryCard 
              user={user} 
              onEditProfile={handleEditProfile}
            />

            {/* Quick Actions */}
            <QuickActionCards onNavigate={handleNavigation} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left Column - Application Tracker */}
              <div className="xl:col-span-2">
                <ApplicationTracker onViewAll={handleNavigation} />
              </div>

              {/* Right Column - Sidebar Content */}
              <div className="space-y-6">
                <NotificationsPreview onViewAll={handleNavigation} />
                <MentorshipCard onNavigate={handleNavigation} />
              </div>
            </div>
          </div>
        );

      case 'applications':
        return (
          <div className="space-y-6">
            <ApplicationTracker onViewAll={handleNavigation} />
          </div>
        );

      case 'learning':
        return (
          <div className="space-y-6">
            <LearningProgress onNavigate={handleNavigation} />
          </div>
        );

      case 'mentorship':
        return (
          <div className="space-y-6">
            <MentorshipCard onNavigate={handleNavigation} />
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="glass-card p-8 text-center">
              <Icon name="BarChart3" size={64} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                Analytics Dashboard
              </h3>
              <p className="text-text-secondary mb-6">
                Detailed analytics and insights about your job search progress, skill development, and career growth.
              </p>
              <Button
                variant="primary"
                iconName="TrendingUp"
                iconPosition="left"
                onClick={() => handleNavigation('/analytics-dashboard')}
              >
                View Full Analytics
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdaptiveHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Welcome back, {user?.name?.split(' ')[0] || 'there'}! 👋
              </h1>
              <p className="text-text-secondary">
                Here's what's happening with your career journey today.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                iconName="Search"
                iconPosition="left"
                onClick={() => handleNavigation('/job-search')}
              >
                Find Jobs
              </Button>
              <Button
                variant="primary"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={() => handleNavigation('/job-seeker-onboarding-wizard')}
              >
                Complete Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <NavigationTabs 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          className="mb-8"
        />

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {renderTabContent()}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="glass-card p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
            <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
              Ready to take the next step?
            </h3>
            <p className="text-text-secondary mb-6">
              Explore new opportunities and accelerate your career growth with AI-powered job matching.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                iconName="Search"
                iconPosition="left"
                onClick={() => handleNavigation('/job-search')}
              >
                Browse Jobs
              </Button>
              <Button
                variant="outline"
                iconName="BookOpen"
                iconPosition="left"
                onClick={() => handleNavigation('/learning-hub')}
              >
                Explore Courses
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobSeekerDashboard;