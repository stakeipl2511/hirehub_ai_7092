import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import NotificationCard from './components/NotificationCard';
import NotificationTabs from './components/NotificationTabs';
import FilterControls from './components/FilterControls';
import BulkActionsToolbar from './components/BulkActionsToolbar';
import NotificationSettings from './components/NotificationSettings';

const NotificationsCenter = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [expandedNotification, setExpandedNotification] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      category: 'job',
      sender: 'TechCorp Solutions',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
      message: 'Your application for Senior React Developer position has been reviewed. We would like to schedule an interview.',
      fullMessage: `Dear Candidate,\n\nThank you for your interest in the Senior React Developer position at TechCorp Solutions. After reviewing your application and portfolio, we are impressed with your experience and would like to move forward with the next step in our hiring process.\n\nWe would like to schedule a technical interview with our development team. The interview will cover React concepts, JavaScript fundamentals, and system design principles.\n\nPlease let us know your availability for the coming week.\n\nBest regards,\nHiring Team`,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      isRead: false,
      priority: 'high',
      canRespond: true,
      hasAttachment: false,
      attachments: []
    },
    {
      id: 2,
      category: 'learning',
      sender: 'HireHub Learning',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      message: 'Congratulations! You have completed the Advanced JavaScript course. Your certificate is ready.',
      fullMessage: `Congratulations on completing the Advanced JavaScript course!\n\nYou have successfully finished all modules and passed the final assessment with a score of 92%. Your dedication to learning is commendable.\n\nYour certificate is now available for download. You can add this certification to your profile to showcase your skills to potential employers.\n\nKeep up the excellent work!`,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isRead: false,
      priority: 'medium',
      canRespond: false,
      hasAttachment: true,
      attachments: [
        { name: 'JavaScript_Certificate.pdf', url: '#' }
      ]
    },
    {
      id: 3,
      category: 'mentorship',
      sender: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      message: 'Hi! I would love to mentor you in your career journey. Let\'s schedule a call to discuss your goals.',
      fullMessage: `Hello!\n\nI came across your profile and I'm impressed with your background and career aspirations. As someone who has been in the tech industry for over 10 years, I would love to offer my guidance and support as your mentor.\n\nI specialize in career development, technical leadership, and navigating the job market. I believe I can help you achieve your professional goals.\n\nWould you be interested in scheduling a 30-minute introductory call this week? We can discuss your career objectives and how I can best support you.\n\nLooking forward to hearing from you!`,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      isRead: true,
      priority: 'medium',
      canRespond: true,
      hasAttachment: false,
      attachments: []
    },
    {
      id: 4,
      category: 'job',sender: 'StartupXYZ',avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',message: 'New job opportunity: Full Stack Developer - Remote position with competitive salary.',
      fullMessage: `We have an exciting opportunity for a Full Stack Developer to join our growing team!\n\nPosition: Full Stack Developer\nLocation: Remote (US timezone)\nSalary: $80,000 - $120,000\n\nRequirements:\n- 3+ years of experience with React and Node.js\n- Experience with PostgreSQL and MongoDB\n- Strong problem-solving skills\n- Excellent communication abilities\n\nWe offer:\n- Flexible working hours\n- Health insurance\n- Professional development budget\n- Stock options\n\nThis role offers great growth opportunities in a fast-paced startup environment. Apply now to be considered!`,
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      isRead: true,
      priority: 'medium',
      canRespond: false,
      hasAttachment: false,
      attachments: []
    },
    {
      id: 5,
      category: 'system',sender: 'HireHub System',avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',message: 'Your profile has been updated successfully. Review your changes and ensure all information is accurate.',
      fullMessage: `Your profile update has been processed successfully.\n\nChanges made:\n- Updated work experience\n- Added new skills: TypeScript, GraphQL\n- Modified availability status\n\nPlease review your profile to ensure all information is accurate and up-to-date. A complete and accurate profile increases your chances of being discovered by recruiters.\n\nIf you notice any errors, you can edit your profile at any time from your dashboard.`,
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      isRead: true,
      priority: 'low',
      canRespond: false,
      hasAttachment: false,
      attachments: []
    },
    {
      id: 6,
      category: 'learning',sender: 'HireHub Learning',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',message: 'New course available: "System Design Fundamentals" - Perfect for senior developer roles.',fullMessage: `We're excited to announce a new course that will help advance your career!\n\nCourse: System Design Fundamentals\nDuration: 6 weeks\nLevel: Intermediate to Advanced\nInstructor: Alex Chen, Senior Architect at Google\n\nWhat you'll learn:\n- Scalability principles\n- Database design patterns\n- Microservices architecture\n- Load balancing strategies\n- Caching mechanisms\n\nThis course is specifically designed for developers looking to move into senior or architect roles. Early bird discount available for the next 48 hours!\n\nEnroll now to secure your spot.`,
      timestamp: new Date(Date.now() - 18000000), // 5 hours ago
      isRead: false,
      priority: 'medium',
      canRespond: false,
      hasAttachment: false,
      attachments: []
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    setNotifications(mockNotifications);
  }, []);

  // Filter and sort notifications
  const filteredNotifications = notifications.filter(notification => {
    // Tab filter
    if (activeTab !== 'all' && notification.category !== activeTab) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      if (!notification.message.toLowerCase().includes(searchLower) &&
          !notification.sender.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    // Active filters
    if (activeFilters.includes('unread') && notification.isRead) return false;
    if (activeFilters.includes('read') && !notification.isRead) return false;
    if (activeFilters.includes('high-priority') && notification.priority !== 'high') return false;
    if (activeFilters.includes('has-attachments') && !notification.hasAttachment) return false;

    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.timestamp) - new Date(b.timestamp);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'sender':
        return a.sender.localeCompare(b.sender);
      default: // newest
        return new Date(b.timestamp) - new Date(a.timestamp);
    }
  });

  // Calculate notification counts
  const notificationCounts = {
    all: notifications.length,
    job: notifications.filter(n => n.category === 'job').length,
    learning: notifications.filter(n => n.category === 'learning').length,
    mentorship: notifications.filter(n => n.category === 'mentorship').length,
    system: notifications.filter(n => n.category === 'system').length
  };

  const handleNotificationSelect = (id) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(notifId => notifId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedNotifications(filteredNotifications.map(n => n.id));
  };

  const handleClearSelection = () => {
    setSelectedNotifications([]);
  };

  const handleMarkRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => 
      prev.map(notification => 
        selectedNotifications.includes(notification.id)
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setSelectedNotifications([]);
  };

  const handleArchive = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    setSelectedNotifications(prev => prev.filter(notifId => notifId !== id));
  };

  const handleArchiveSelected = () => {
    setNotifications(prev => 
      prev.filter(notification => !selectedNotifications.includes(notification.id))
    );
    setSelectedNotifications([]);
  };

  const handleDeleteSelected = () => {
    setNotifications(prev => 
      prev.filter(notification => !selectedNotifications.includes(notification.id))
    );
    setSelectedNotifications([]);
  };

  const handleRespond = (notification) => {
    console.log('Responding to notification:', notification);
    // Implement response functionality
  };

  const handleExpand = (id) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };

  const handleSettingsSave = (settings) => {
    console.log('Saving notification settings:', settings);
    // Implement settings save functionality
  };

  return (
    <>
      <Helmet>
        <title>Notifications Center - HireHub AI</title>
        <meta name="description" content="Manage all your notifications in one place. Stay updated with job alerts, learning progress, mentorship opportunities, and system updates." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="glass-card border-b border-white/10 sticky top-16 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-glass-primary">
                  <Icon name="Bell" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-text-primary">Notifications Center</h1>
                  <p className="text-text-secondary">
                    {filteredNotifications.length} notifications
                    {selectedNotifications.length > 0 && ` • ${selectedNotifications.length} selected`}
                  </p>
                </div>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setIsSettingsOpen(true)}
                iconName="Settings"
                iconPosition="left"
              >
                Settings
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Tabs */}
            <NotificationTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              notificationCounts={notificationCounts}
            />

            {/* Filter Controls */}
            <FilterControls
              onFilterChange={setActiveFilters}
              onSortChange={setSortBy}
              onSearch={setSearchQuery}
              activeFilters={activeFilters}
              searchQuery={searchQuery}
            />

            {/* Bulk Actions Toolbar */}
            <BulkActionsToolbar
              selectedCount={selectedNotifications.length}
              totalCount={filteredNotifications.length}
              onMarkAllRead={handleMarkAllRead}
              onArchiveSelected={handleArchiveSelected}
              onDeleteSelected={handleDeleteSelected}
              onSelectAll={handleSelectAll}
              onClearSelection={handleClearSelection}
            />

            {/* Notifications List */}
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Icon name="Bell" size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">No notifications found</h3>
                  <p className="text-text-secondary">
                    {searchQuery || activeFilters.length > 0 
                      ? 'Try adjusting your filters or search terms' :'You\'re all caught up! New notifications will appear here.'
                    }
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    isSelected={selectedNotifications.includes(notification.id)}
                    isExpanded={expandedNotification === notification.id}
                    onSelect={handleNotificationSelect}
                    onMarkRead={handleMarkRead}
                    onArchive={handleArchive}
                    onRespond={handleRespond}
                    onExpand={handleExpand}
                  />
                ))
              )}
            </div>

            {/* Load More Button */}
            {filteredNotifications.length > 0 && (
              <div className="text-center pt-8">
                <Button
                  variant="outline"
                  iconName="ChevronDown"
                  iconPosition="right"
                >
                  Load More Notifications
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Settings Modal */}
        <NotificationSettings
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onSave={handleSettingsSave}
        />
      </div>
    </>
  );
};

export default NotificationsCenter;