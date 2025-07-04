import React from 'react';
import Icon from '../../../components/AppIcon';

const NotificationTabs = ({ activeTab, onTabChange, notificationCounts }) => {
  const tabs = [
    {
      id: 'all',
      label: 'All',
      icon: 'Bell',
      count: notificationCounts.all
    },
    {
      id: 'job',
      label: 'Job Alerts',
      icon: 'Briefcase',
      count: notificationCounts.job
    },
    {
      id: 'learning',
      label: 'Learning',
      icon: 'BookOpen',
      count: notificationCounts.learning
    },
    {
      id: 'mentorship',
      label: 'Mentorship',
      icon: 'Users',
      count: notificationCounts.mentorship
    },
    {
      id: 'system',
      label: 'System',
      icon: 'Settings',
      count: notificationCounts.system
    }
  ];

  return (
    <div className="glass-card border border-white/10 rounded-[1.25rem] p-1">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 spring-bounce
              whitespace-nowrap flex-shrink-0 min-w-0
              ${activeTab === tab.id
                ? 'bg-primary text-white shadow-glass-primary'
                : 'text-text-secondary hover:text-primary hover:bg-white/10'
              }
            `}
          >
            <Icon 
              name={tab.icon} 
              size={16} 
              className={`flex-shrink-0 ${activeTab === tab.id ? 'text-white' : ''}`}
            />
            <span className="text-sm font-medium truncate">
              {tab.label}
            </span>
            {tab.count > 0 && (
              <div className={`
                flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-bold
                ${activeTab === tab.id
                  ? 'bg-white/20 text-white' :'bg-primary/20 text-primary'
                }
              `}>
                {tab.count > 99 ? '99+' : tab.count}
              </div>
            )}
            
            {/* Active indicator */}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NotificationTabs;