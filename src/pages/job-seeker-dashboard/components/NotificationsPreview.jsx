import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import NotificationBadge from '../../../components/ui/NotificationBadge';

const NotificationsPreview = ({ onViewAll }) => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'job',
      title: 'New Job Match Found',
      message: 'Senior React Developer at TechCorp matches your profile perfectly',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      isRead: false,
      priority: 'high',
      icon: 'Briefcase',
      color: 'primary'
    },
    {
      id: 2,
      type: 'application',
      title: 'Application Update',
      message: 'Your application for Frontend Developer at InnovateLabs has been reviewed',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      isRead: false,
      priority: 'medium',
      icon: 'FileText',
      color: 'warning'
    },
    {
      id: 3,
      type: 'learning',
      title: 'Course Completed',
      message: 'Congratulations! You completed "Advanced React Patterns"',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isRead: true,
      priority: 'low',
      icon: 'Award',
      color: 'success'
    },
    {
      id: 4,
      type: 'mentorship',
      title: 'Mentor Message',
      message: 'Sarah Johnson sent you a message about your career goals',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      isRead: false,
      priority: 'medium',
      icon: 'MessageCircle',
      color: 'secondary'
    },
    {
      id: 5,
      type: 'system',
      title: 'Profile Views',
      message: 'Your profile was viewed by 3 recruiters this week',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      isRead: true,
      priority: 'low',
      icon: 'Eye',
      color: 'accent'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const recentNotifications = notifications.slice(0, 4);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-error';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-success';
      default: return 'border-l-primary';
    }
  };

  const getIconColor = (color) => {
    switch (color) {
      case 'primary': return 'text-primary bg-primary/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'success': return 'text-success bg-success/10';
      case 'secondary': return 'text-secondary bg-secondary/10';
      case 'accent': return 'text-accent bg-accent/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  return (
    <div className="glass-card p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <div className="px-2 py-1 bg-error text-white rounded-full text-xs font-medium">
              {unreadCount}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <NotificationBadge
            count={unreadCount}
            onClick={() => onViewAll('/notifications-center')}
            size="sm"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            onClick={() => onViewAll('/notification-settings')}
          />
        </div>
      </div>

      <div className="space-y-3">
        {recentNotifications.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="text-text-tertiary mx-auto mb-4" />
            <p className="text-text-secondary">No notifications yet</p>
          </div>
        ) : (
          recentNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`
                relative p-4 rounded-xl border-l-4 transition-all duration-300 cursor-pointer
                ${getPriorityColor(notification.priority)}
                ${notification.isRead 
                  ? 'bg-surface hover:bg-background-secondary' :'bg-primary/5 hover:bg-primary/10 shadow-glass-secondary'
                }
                hover:shadow-glass-primary hover-lift
              `}
              onClick={() => onViewAll(`/notifications-center?id=${notification.id}`)}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                  ${getIconColor(notification.color)}
                `}>
                  <Icon name={notification.icon} size={18} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className={`
                      text-sm font-semibold truncate
                      ${notification.isRead ? 'text-text-secondary' : 'text-text-primary'}
                    `}>
                      {notification.title}
                    </h4>
                    
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-text-tertiary">
                        {getTimeAgo(notification.timestamp)}
                      </span>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      )}
                    </div>
                  </div>

                  <p className={`
                    text-xs line-clamp-2
                    ${notification.isRead ? 'text-text-tertiary' : 'text-text-secondary'}
                  `}>
                    {notification.message}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <span className={`
                      text-xs px-2 py-1 rounded-full font-medium
                      ${notification.type === 'job' ? 'bg-primary/10 text-primary' :
                        notification.type === 'application' ? 'bg-warning/10 text-warning' :
                        notification.type === 'learning' ? 'bg-success/10 text-success' :
                        notification.type === 'mentorship'? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
                      }
                    `}>
                      {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                    </span>

                    {notification.priority === 'high' && (
                      <div className="flex items-center gap-1 text-error">
                        <Icon name="AlertCircle" size={12} />
                        <span className="text-xs font-medium">High Priority</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {!notification.isRead && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl pointer-events-none" />
              )}
            </div>
          ))
        )}
      </div>

      {recentNotifications.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            iconName="Bell"
            iconPosition="left"
            onClick={() => onViewAll('/notifications-center')}
          >
            View All Notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationsPreview;