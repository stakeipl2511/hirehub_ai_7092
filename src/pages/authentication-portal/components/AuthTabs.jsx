import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AuthTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: 'Sign In', icon: 'LogIn' },
    { id: 'register', label: 'Sign Up', icon: 'UserPlus' }
  ];

  return (
    <div className="flex bg-background-secondary/50 p-1 rounded-xl mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg
            font-medium transition-all duration-300 spring-smooth
            ${activeTab === tab.id
              ? 'bg-surface text-primary shadow-glass-secondary border border-primary/20'
              : 'text-text-secondary hover:text-primary hover:bg-white/10'
            }
          `}
        >
          <Icon 
            name={tab.icon} 
            size={18} 
            className={`transition-colors duration-300 ${
              activeTab === tab.id ? 'text-primary' : 'text-text-secondary'
            }`}
          />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;