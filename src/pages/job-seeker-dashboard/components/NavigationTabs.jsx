import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NavigationTabs = ({ activeTab, onTabChange, className = '' }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'LayoutDashboard',
      description: 'Dashboard overview and quick actions',
      count: null
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: 'FileText',
      description: 'Track your job applications',
      count: 12
    },
    {
      id: 'learning',
      label: 'Learning',
      icon: 'BookOpen',
      description: 'Courses and skill development',
      count: 3
    },
    {
      id: 'mentorship',
      label: 'Mentorship',
      icon: 'Users',
      description: 'Connect with mentors',
      count: 2
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      description: 'Performance insights',
      count: null
    }
  ];

  const handleTabClick = (tabId) => {
    if (tabId === activeTab) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      onTabChange(tabId);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className={`${className}`}>
      {/* Desktop Tabs */}
      <div className="hidden lg:block">
        <div className="glass-card p-2">
          <div className="flex items-center space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                  ${activeTab === tab.id
                    ? 'bg-primary text-white shadow-glass-primary'
                    : 'hover:bg-white/10 text-text-secondary hover:text-primary'
                  }
                  ${isAnimating ? 'pointer-events-none' : ''}
                `}
                aria-label={tab.description}
              >
                <Icon 
                  name={tab.icon} 
                  size={18} 
                  className={`transition-transform duration-300 ${
                    activeTab === tab.id ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                />
                <span className="font-medium text-sm whitespace-nowrap">
                  {tab.label}
                </span>
                {tab.count && (
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs font-medium
                    ${activeTab === tab.id
                      ? 'bg-white/20 text-white' :'bg-primary/10 text-primary'
                    }
                  `}>
                    {tab.count}
                  </span>
                )}
                
                {activeTab === tab.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-xl animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden">
        <div className="glass-card p-1">
          <div className="grid grid-cols-5 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  relative flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300
                  ${activeTab === tab.id
                    ? 'bg-primary text-white shadow-glass-primary'
                    : 'hover:bg-white/10 text-text-secondary hover:text-primary'
                  }
                  ${isAnimating ? 'pointer-events-none' : ''}
                `}
                aria-label={tab.description}
              >
                <div className="relative">
                  <Icon 
                    name={tab.icon} 
                    size={20} 
                    className={`transition-transform duration-300 ${
                      activeTab === tab.id ? 'scale-110' : ''
                    }`}
                  />
                  {tab.count && (
                    <div className={`
                      absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center
                      ${activeTab === tab.id
                        ? 'bg-white text-primary' :'bg-error text-white'
                      }
                    `}>
                      {tab.count > 9 ? '9+' : tab.count}
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium text-center leading-tight">
                  {tab.label}
                </span>
                
                {activeTab === tab.id && (
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/10 to-primary/20 rounded-xl animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content Indicator */}
      <div className="mt-4 lg:mt-6">
        <div className={`
          transition-all duration-300 transform
          ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
        `}>
          {tabs.map((tab) => (
            activeTab === tab.id && (
              <div key={tab.id} className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name={tab.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-heading font-bold text-text-primary">
                    {tab.label}
                  </h2>
                  <p className="text-sm text-text-secondary">
                    {tab.description}
                  </p>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;