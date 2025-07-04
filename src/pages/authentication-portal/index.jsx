import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import SocialAuthButtons from './components/SocialAuthButtons';
import BenefitsPanel from './components/BenefitsPanel';
import ConfettiAnimation from './components/ConfettiAnimation';

const AuthenticationPortal = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowForgotPassword(false);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setActiveTab('login');
  };

  const getPageTitle = () => {
    if (showForgotPassword) return 'Reset Password - HireHub AI';
    return activeTab === 'login' ? 'Sign In - HireHub AI' : 'Sign Up - HireHub AI';
  };

  const getPageDescription = () => {
    if (showForgotPassword) return 'Reset your HireHub AI password to regain access to your account.';
    return activeTab === 'login' ?'Sign in to your HireHub AI account and discover AI-powered job matching and career development opportunities.' :'Create your HireHub AI account and start your journey with intelligent job matching and career growth tools.';
  };

  return (
    <>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="keywords" content="HireHub AI, job portal, career development, AI matching, authentication, sign in, sign up" />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-accent/20 flex">
        <ConfettiAnimation />
        
        {/* Benefits Panel - Desktop Only */}
        <BenefitsPanel />
        
        {/* Authentication Form */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md">
            <div className="glass-card p-8 shadow-glass-primary border border-white/20">
              {!showForgotPassword ? (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gradient mb-2">
                      {activeTab === 'login' ? 'Welcome back!' : 'Join HireHub AI'}
                    </h1>
                    <p className="text-text-secondary">
                      {activeTab === 'login' ?'Sign in to continue your career journey' :'Start your AI-powered career journey today'
                      }
                    </p>
                  </div>

                  <AuthTabs 
                    activeTab={activeTab} 
                    onTabChange={handleTabChange} 
                  />

                  {activeTab === 'login' ? (
                    <LoginForm onForgotPassword={handleForgotPassword} />
                  ) : (
                    <RegisterForm />
                  )}

                  <div className="mt-8">
                    <SocialAuthButtons mode={activeTab} />
                  </div>
                </>
              ) : (
                <ForgotPasswordForm onBack={handleBackToLogin} />
              )}
            </div>

            {/* Mobile Benefits Summary */}
            <div className="lg:hidden mt-8 space-y-4">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-text-primary mb-2">
                  Why choose HireHub AI?
                </h2>
                <div className="flex justify-center space-x-6 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>AI Matching</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Career Growth</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Expert Mentorship</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthenticationPortal;