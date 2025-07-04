import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelector = ({ selectedRole, onRoleChange }) => {
  const roles = [
    {
      id: 'job-seeker',
      label: 'Job Seeker',
      icon: 'User',
      description: 'Find your dream job'
    },
    {
      id: 'recruiter',
      label: 'Recruiter',
      icon: 'Users',
      description: 'Discover top talent'
    },
    {
      id: 'employer',
      label: 'Employer',
      icon: 'Building2',
      description: 'Hire the best candidates'
    }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-text-primary mb-3">
        I am a...
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => onRoleChange(role.id)}
            className={`
              p-4 rounded-xl border-2 transition-all duration-300 spring-smooth
              text-left hover-lift group
              ${selectedRole === role.id
                ? 'border-primary bg-primary/10 shadow-glass-primary'
                : 'border-border hover:border-primary/50 hover:bg-primary/5'
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
                ${selectedRole === role.id
                  ? 'bg-primary text-white' :'bg-background-secondary text-text-secondary group-hover:bg-primary/20 group-hover:text-primary'
                }
              `}>
                <Icon name={role.icon} size={20} />
              </div>
              <div className="flex-1">
                <div className={`
                  font-medium transition-colors duration-300
                  ${selectedRole === role.id ? 'text-primary' : 'text-text-primary'}
                `}>
                  {role.label}
                </div>
                <div className="text-xs text-text-secondary mt-0.5">
                  {role.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;