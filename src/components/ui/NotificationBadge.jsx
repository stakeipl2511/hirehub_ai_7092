import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationBadge = ({ 
  count = 0, 
  onClick, 
  isActive = false, 
  size = 'md',
  showPulse = true,
  maxCount = 99,
  className = ''
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayCount, setDisplayCount] = useState(count);

  useEffect(() => {
    if (count !== displayCount) {
      setIsAnimating(true);
      setTimeout(() => {
        setDisplayCount(count);
        setIsAnimating(false);
      }, 150);
    }
  }, [count, displayCount]);

  const sizeClasses = {
    sm: {
      button: 'p-2',
      icon: 16,
      badge: 'w-4 h-4 text-xs -top-1 -right-1',
      dot: 'w-2 h-2 -top-0.5 -right-0.5'
    },
    md: {
      button: 'p-2.5',
      icon: 20,
      badge: 'w-5 h-5 text-xs -top-1.5 -right-1.5',
      dot: 'w-2.5 h-2.5 -top-1 -right-1'
    },
    lg: {
      button: 'p-3',
      icon: 24,
      badge: 'w-6 h-6 text-sm -top-2 -right-2',
      dot: 'w-3 h-3 -top-1 -right-1'
    }
  };

  const currentSize = sizeClasses[size];
  const hasNotifications = displayCount > 0;
  const formattedCount = displayCount > maxCount ? `${maxCount}+` : displayCount.toString();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative ${currentSize.button} rounded-lg transition-all duration-300 focus-ring
        ${isActive 
          ? 'bg-primary/20 text-primary shadow-glass-primary' 
          : 'hover:bg-white/10 text-text-secondary hover:text-primary'
        }
        ${hasNotifications && showPulse ? 'animate-pulse' : ''}
        ${className}
      `}
      aria-label={`Notifications ${hasNotifications ? `(${displayCount} unread)` : ''}`}
    >
      <Icon 
        name="Bell" 
        size={currentSize.icon} 
        className={`transition-transform duration-200 ${isAnimating ? 'scale-110' : 'scale-100'}`}
      />
      
      {hasNotifications && (
        <div className={`
          absolute ${currentSize.badge} bg-error text-white rounded-full 
          flex items-center justify-center font-medium
          transform transition-all duration-300 spring-bounce
          ${isAnimating ? 'scale-125' : 'scale-100'}
          shadow-lg border-2 border-surface
        `}>
          {displayCount <= maxCount ? formattedCount : `${maxCount}+`}
        </div>
      )}
      
      {!hasNotifications && showPulse && (
        <div className={`
          absolute ${currentSize.dot} bg-primary rounded-full
          animate-ping opacity-75
        `} />
      )}
      
      {hasNotifications && showPulse && (
        <div className="absolute inset-0 rounded-lg bg-primary/10 animate-pulse" />
      )}
    </button>
  );
};

export default NotificationBadge;