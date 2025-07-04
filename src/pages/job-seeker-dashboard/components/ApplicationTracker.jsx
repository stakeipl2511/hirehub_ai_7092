import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const ApplicationTracker = ({ onViewAll }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const applications = [
    {
      id: 1,
      company: "TechCorp Solutions",
      position: "Senior Frontend Developer",
      appliedDate: "2024-01-15",
      status: "interview",
      progress: 75,
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center",
      salary: "$85,000 - $110,000",
      location: "San Francisco, CA",
      type: "Full-time",
      nextStep: "Technical Interview - Jan 25",
      statusColor: "warning"
    },
    {
      id: 2,
      company: "InnovateLabs",
      position: "React Developer",
      appliedDate: "2024-01-12",
      status: "reviewed",
      progress: 50,
      logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=64&h=64&fit=crop&crop=center",
      salary: "$70,000 - $90,000",
      location: "Remote",
      type: "Full-time",
      nextStep: "Waiting for response",
      statusColor: "primary"
    },
    {
      id: 3,
      company: "StartupXYZ",
      position: "Full Stack Engineer",
      appliedDate: "2024-01-10",
      status: "pending",
      progress: 25,
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=64&h=64&fit=crop&crop=center",
      salary: "$75,000 - $95,000",
      location: "New York, NY",
      type: "Full-time",
      nextStep: "Application under review",
      statusColor: "secondary"
    },
    {
      id: 4,
      company: "MegaCorp Inc",
      position: "Software Engineer",
      appliedDate: "2024-01-08",
      status: "rejected",
      progress: 100,
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=64&h=64&fit=crop&crop=center",
      salary: "$80,000 - $100,000",
      location: "Austin, TX",
      type: "Full-time",
      nextStep: "Application closed",
      statusColor: "error"
    }
  ];

  const statusFilters = [
    { key: 'all', label: 'All Applications', count: applications.length },
    { key: 'pending', label: 'Pending', count: applications.filter(app => app.status === 'pending').length },
    { key: 'reviewed', label: 'Reviewed', count: applications.filter(app => app.status === 'reviewed').length },
    { key: 'interview', label: 'Interview', count: applications.filter(app => app.status === 'interview').length },
    { key: 'rejected', label: 'Rejected', count: applications.filter(app => app.status === 'rejected').length }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return 'Clock';
      case 'reviewed': return 'Eye';
      case 'interview': return 'MessageCircle';
      case 'rejected': return 'X';
      default: return 'FileText';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'reviewed': return 'Under Review';
      case 'interview': return 'Interview Stage';
      case 'rejected': return 'Not Selected';
      default: return 'Applied';
    }
  };

  const filteredApplications = selectedFilter === 'all' 
    ? applications 
    : applications.filter(app => app.status === selectedFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Application Tracker
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => onViewAll('/job-search')}
        >
          Apply to Jobs
        </Button>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setSelectedFilter(filter.key)}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
              ${selectedFilter === filter.key
                ? 'bg-primary text-white shadow-glass-primary'
                : 'bg-surface hover:bg-primary/10 text-text-secondary hover:text-primary border border-border'
              }
            `}
          >
            {filter.label}
            {filter.count > 0 && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                selectedFilter === filter.key 
                  ? 'bg-white/20 text-white' :'bg-primary/10 text-primary'
              }`}>
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <Icon name="Briefcase" size={48} className="text-text-tertiary mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-text-primary mb-2">
              No applications found
            </h4>
            <p className="text-text-secondary mb-4">
              {selectedFilter === 'all' ? "You haven't applied to any jobs yet. Start exploring opportunities!"
                : `No applications with ${selectedFilter} status.`
              }
            </p>
            <Button
              variant="primary"
              iconName="Search"
              iconPosition="left"
              onClick={() => onViewAll('/job-search')}
            >
              Find Jobs
            </Button>
          </div>
        ) : (
          filteredApplications.map((application) => (
            <div
              key={application.id}
              className="glass-card p-6 hover-lift transition-all duration-300 hover:shadow-glow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface border border-border flex-shrink-0">
                    <img
                      src={application.logo}
                      alt={application.company}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-base font-semibold text-text-primary mb-1">
                          {application.position}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {application.company}
                        </p>
                      </div>
                      
                      <div className={`
                        flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                        ${application.statusColor === 'warning' ? 'bg-warning/10 text-warning' :
                          application.statusColor === 'primary' ? 'bg-primary/10 text-primary' :
                          application.statusColor === 'secondary'? 'bg-secondary/10 text-secondary' : 'bg-error/10 text-error'
                        }
                      `}>
                        <Icon name={getStatusIcon(application.status)} size={12} />
                        {getStatusLabel(application.status)}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-text-tertiary mb-3">
                      <div className="flex items-center gap-1">
                        <Icon name="MapPin" size={12} />
                        {application.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={12} />
                        {application.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="DollarSign" size={12} />
                        {application.salary}
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={12} />
                        Applied {new Date(application.appliedDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">
                          {application.nextStep}
                        </span>
                        <span className="text-sm font-medium text-primary">
                          {application.progress}%
                        </span>
                      </div>
                      
                      <ProgressIndicator
                        currentStep={application.progress}
                        totalSteps={100}
                        variant="linear"
                        showLabels={false}
                        showPercentage={false}
                        animated={true}
                        color={application.statusColor}
                        size="sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 lg:flex-col lg:items-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    onClick={() => onViewAll(`/application/${application.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageSquare"
                    onClick={() => onViewAll(`/messages/${application.id}`)}
                  >
                    Message
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredApplications.length > 0 && (
        <div className="text-center">
          <Button
            variant="outline"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => onViewAll('/applications')}
          >
            View All Applications
          </Button>
        </div>
      )}
    </div>
  );
};

export default ApplicationTracker;