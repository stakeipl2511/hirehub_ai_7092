import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';

const RoleBasedMenu = ({ user, onNavigate, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const menuRef = useRef(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (action, path) => {
    if (action === 'navigate' && path) {
      onNavigate(path);
    } else if (action === 'theme') {
      toggleTheme();
    } else if (action === 'language') {
      toggleLanguage();
    }
    setIsOpen(false);
  };

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const getRoleSpecificMenuItems = () => {
    const baseItems = [
      {
        label: 'Profile Settings',
        icon: 'Settings',
        action: 'navigate',
        path: '/profile-settings',
        description: 'Manage your account preferences'
      },
      {
        label: 'Help & Support',
        icon: 'HelpCircle',
        action: 'navigate',
        path: '/help-support',
        description: 'Get assistance and documentation'
      }
    ];

    const roleSpecificItems = {
      'job-seeker': [
        {
          label: 'My Applications',
          icon: 'FileText',
          action: 'navigate',
          path: '/my-applications',
          description: 'Track your job applications'
        },
        {
          label: 'Skill Assessment',
          icon: 'Award',
          action: 'navigate',
          path: '/skill-assessment',
          description: 'Take skill tests and certifications'
        },
        {
          label: 'Career Insights',
          icon: 'TrendingUp',
          action: 'navigate',
          path: '/career-insights',
          description: 'View market trends and recommendations'
        }
      ],
      'recruiter': [
        {
          label: 'Candidate Pool',
          icon: 'Users',
          action: 'navigate',
          path: '/candidate-pool',
          description: 'Browse and manage candidates'
        },
        {
          label: 'Job Postings',
          icon: 'Briefcase',
          action: 'navigate',
          path: '/job-postings',
          description: 'Create and manage job listings'
        },
        {
          label: 'Analytics Dashboard',
          icon: 'BarChart3',
          action: 'navigate',
          path: '/analytics',
          description: 'View recruitment metrics'
        }
      ],
      'employer': [
        {
          label: 'Company Profile',
          icon: 'Building2',
          action: 'navigate',
          path: '/company-profile',
          description: 'Manage company information'
        },
        {
          label: 'Team Management',
          icon: 'UserCheck',
          action: 'navigate',
          path: '/team-management',
          description: 'Manage team members and permissions'
        },
        {
          label: 'Hiring Pipeline',
          icon: 'GitBranch',
          action: 'navigate',
          path: '/hiring-pipeline',
          description: 'Track hiring progress'
        }
      ]
    };

    const userRole = user?.role || 'job-seeker';
    return [...(roleSpecificItems[userRole] || []), ...baseItems];
  };

  const menuItems = getRoleSpecificMenuItems();

  const UserAvatar = () => (
    <div className="relative">
      {user?.avatar ? (
        <Image
          src={user.avatar}
          alt={user.name || 'User'}
          className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-2 border-white/20">
          <span className="text-white text-sm font-semibold">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </div>
      )}
      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-surface"></div>
    </div>
  );

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={`
          flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 focus-ring
          ${isOpen 
            ? 'bg-primary/20 text-primary shadow-glass-primary' 
            : 'hover:bg-white/10 text-text-secondary hover:text-primary'
          }
        `}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <UserAvatar />
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-text-primary">
            {user?.name || 'User'}
          </div>
          <div className="text-xs text-text-secondary capitalize">
            {user?.role?.replace('-', ' ') || 'Job Seeker'}
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 glass-card border border-white/20 rounded-xl shadow-glass-primary z-1200 animate-scale-in">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <UserAvatar />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-text-primary truncate">
                  {user?.name || 'User Name'}
                </div>
                <div className="text-xs text-text-secondary truncate">
                  {user?.email || 'user@example.com'}
                </div>
                <div className="text-xs text-primary capitalize font-medium">
                  {user?.role?.replace('-', ' ') || 'Job Seeker'}
                </div>
              </div>
            </div>
          </div>

          <div className="py-2 max-h-80 overflow-y-auto">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuClick(item.action, item.path)}
                className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 flex items-start space-x-3 group"
              >
                <Icon 
                  name={item.icon} 
                  size={18} 
                  className="text-text-secondary group-hover:text-primary transition-colors duration-200 mt-0.5 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors duration-200">
                    {item.label}
                  </div>
                  {item.description && (
                    <div className="text-xs text-text-secondary mt-0.5">
                      {item.description}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-white/10 space-y-2">
            <button
              onClick={() => handleMenuClick('theme')}
              className="w-full px-3 py-2 text-left hover:bg-white/10 transition-colors duration-200 flex items-center space-x-3 rounded-lg"
            >
              <Icon name="Palette" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">Toggle Theme</span>
            </button>
            
            <button
              onClick={() => handleMenuClick('language')}
              className="w-full px-3 py-2 text-left hover:bg-white/10 transition-colors duration-200 flex items-center space-x-3 rounded-lg"
            >
              <Icon name="Globe" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">
                Language: {currentLanguage.toUpperCase()}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleBasedMenu;