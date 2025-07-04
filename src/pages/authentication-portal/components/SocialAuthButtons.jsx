import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';

const SocialAuthButtons = ({ mode = 'login' }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialAuth = async (provider) => {
    setLoadingProvider(provider);
    
    // Simulate OAuth flow
    setTimeout(() => {
      setLoadingProvider(null);
      // Mock successful authentication
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'job-seeker',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      };
      
      localStorage.setItem('authToken', 'mock-jwt-token-12345');
      localStorage.setItem('userData', JSON.stringify(mockUser));
      
      // Redirect to dashboard
      window.location.href = '/job-seeker-dashboard';
    }, 2000);
  };

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface text-text-secondary">
            Or {mode === 'login' ? 'sign in' : 'sign up'} with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => handleSocialAuth(provider.id)}
            disabled={loadingProvider !== null}
            className={`
              flex items-center justify-center space-x-3 py-3 px-4 rounded-lg
              border-2 transition-all duration-300 spring-smooth
              ${provider.bgColor} ${provider.textColor} ${provider.borderColor}
              hover-lift focus-ring disabled:opacity-50 disabled:cursor-not-allowed
              ${loadingProvider === provider.id ? 'animate-pulse' : ''}
            `}
          >
            {loadingProvider === provider.id ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Icon name={provider.icon} size={20} />
            )}
            <span className="font-medium">
              {loadingProvider === provider.id ? 'Connecting...' : provider.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialAuthButtons;