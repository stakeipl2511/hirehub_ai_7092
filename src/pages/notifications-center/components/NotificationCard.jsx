import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const NotificationCard = ({ 
  notification, 
  isSelected, 
  onSelect, 
  onMarkRead, 
  onArchive, 
  onRespond,
  onExpand,
  isExpanded = false
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAction = (action, event) => {
    event.stopPropagation();
    setIsAnimating(true);
    
    setTimeout(() => {
      switch (action) {
        case 'read':
          onMarkRead(notification.id);
          break;
        case 'archive':
          onArchive(notification.id);
          break;
        case 'respond':
          onRespond(notification);
          break;
        default:
          break;
      }
      setIsAnimating(false);
    }, 150);
  };

  const handleCardClick = () => {
    if (!notification.isRead) {
      onMarkRead(notification.id);
    }
    onExpand(notification.id);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getPriorityIcon = () => {
    switch (notification.priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getCategoryIcon = () => {
    switch (notification.category) {
      case 'job':
        return 'Briefcase';
      case 'learning':
        return 'BookOpen';
      case 'mentorship':
        return 'Users';
      case 'system':
        return 'Settings';
      default:
        return 'Bell';
    }
  };

  return (
    <div
      className={`
        relative group cursor-pointer transition-all duration-300 spring-bounce
        ${notification.isRead ? 'opacity-80' : 'opacity-100'}
        ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
        ${isAnimating ? 'scale-95' : 'hover:scale-[1.01]'}
        ${notification.priority === 'high' && !notification.isRead ? 'animate-pulse' : ''}
      `}
      onClick={handleCardClick}
    >
      <div className={`
        glass-card p-4 border transition-all duration-300
        ${!notification.isRead 
          ? 'border-primary/30 bg-primary/5 shadow-glass-primary' 
          : 'border-white/10 hover:border-white/20'
        }
        ${isExpanded ? 'rounded-t-[1.25rem] rounded-b-none' : 'rounded-[1.25rem]'}
      `}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* Selection Checkbox */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(notification.id);
              }}
              className={`
                w-5 h-5 rounded border-2 transition-all duration-200 flex-shrink-0
                ${isSelected 
                  ? 'bg-primary border-primary text-white' :'border-border hover:border-primary/50'
                }
              `}
            >
              {isSelected && <Icon name="Check" size={12} />}
            </button>

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <Image
                src={notification.avatar}
                alt={notification.sender}
                className="w-10 h-10 rounded-full object-cover"
              />
              {notification.priority === 'high' && !notification.isRead && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full animate-ping" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Icon 
                  name={getCategoryIcon()} 
                  size={14} 
                  className="text-primary flex-shrink-0" 
                />
                <span className="text-sm font-semibold text-text-primary truncate">
                  {notification.sender}
                </span>
                <Icon 
                  name={getPriorityIcon()} 
                  size={12} 
                  className={`
                    flex-shrink-0
                    ${notification.priority === 'high' ? 'text-error' : 
                      notification.priority === 'medium' ? 'text-warning' : 'text-text-tertiary'}
                  `}
                />
              </div>
              <p className="text-sm text-text-secondary line-clamp-2">
                {notification.message}
              </p>
            </div>
          </div>

          {/* Timestamp */}
          <div className="flex flex-col items-end space-y-1 flex-shrink-0 ml-2">
            <span className="text-xs text-text-tertiary">
              {formatTimestamp(notification.timestamp)}
            </span>
            {!notification.isRead && (
              <div className="w-2 h-2 bg-primary rounded-full" />
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${notification.category === 'job' ? 'bg-primary/10 text-primary' :
                notification.category === 'learning' ? 'bg-success/10 text-success' :
                notification.category === 'mentorship'? 'bg-warning/10 text-warning' : 'bg-accent/10 text-accent-600'}
            `}>
              {notification.category.charAt(0).toUpperCase() + notification.category.slice(1)}
            </span>
            {notification.hasAttachment && (
              <Icon name="Paperclip" size={14} className="text-text-tertiary" />
            )}
          </div>

          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {!notification.isRead && (
              <Button
                variant="ghost"
                size="xs"
                onClick={(e) => handleAction('read', e)}
                iconName="Eye"
                className="text-text-tertiary hover:text-primary"
              />
            )}
            <Button
              variant="ghost"
              size="xs"
              onClick={(e) => handleAction('archive', e)}
              iconName="Archive"
              className="text-text-tertiary hover:text-warning"
            />
            {notification.canRespond && (
              <Button
                variant="ghost"
                size="xs"
                onClick={(e) => handleAction('respond', e)}
                iconName="Reply"
                className="text-text-tertiary hover:text-success"
              />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="glass-card border-t-0 rounded-t-none rounded-b-[1.25rem] p-4 border border-white/10 animate-scale-in">
          <div className="space-y-4">
            {/* Full Message */}
            <div className="prose prose-sm max-w-none">
              <p className="text-text-primary whitespace-pre-wrap">
                {notification.fullMessage || notification.message}
              </p>
            </div>

            {/* Attachments */}
            {notification.attachments && notification.attachments.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-text-primary">Attachments</h4>
                <div className="space-y-2">
                  {notification.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-background-secondary rounded-lg">
                      <Icon name="File" size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-primary flex-1">{attachment.name}</span>
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Download"
                        onClick={() => window.open(attachment.url, '_blank')}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 pt-2 border-t border-white/10">
              {notification.canRespond && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={(e) => handleAction('respond', e)}
                  iconName="Reply"
                  iconPosition="left"
                >
                  Respond
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => handleAction('archive', e)}
                iconName="Archive"
                iconPosition="left"
              >
                Archive
              </Button>
              {!notification.isRead && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleAction('read', e)}
                  iconName="Eye"
                  iconPosition="left"
                >
                  Mark as Read
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;