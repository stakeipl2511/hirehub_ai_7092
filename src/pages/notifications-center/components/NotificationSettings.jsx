import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NotificationSettings = ({ isOpen, onClose, onSave }) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    jobAlerts: true,
    learningUpdates: true,
    mentorshipNotifications: true,
    systemMessages: true,
    frequency: 'immediate',
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    },
    categories: {
      job: {
        enabled: true,
        email: true,
        push: true,
        sms: false
      },
      learning: {
        enabled: true,
        email: true,
        push: true,
        sms: false
      },
      mentorship: {
        enabled: true,
        email: false,
        push: true,
        sms: false
      },
      system: {
        enabled: true,
        email: false,
        push: true,
        sms: false
      }
    }
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCategoryChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: {
          ...prev.categories[category],
          [setting]: value
        }
      }
    }));
  };

  const handleQuietHoursChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1200 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl max-h-[90vh] glass-card border border-white/20 rounded-[1.25rem] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <Icon name="Settings" size={24} className="text-primary" />
            <h2 className="text-xl font-bold text-text-primary">Notification Settings</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-8">
            {/* General Settings */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">General Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 glass-surface rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" size={20} className="text-primary" />
                    <div>
                      <div className="font-medium text-text-primary">Email Notifications</div>
                      <div className="text-sm text-text-secondary">Receive notifications via email</div>
                    </div>
                  </div>
                  <Input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 glass-surface rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="Smartphone" size={20} className="text-primary" />
                    <div>
                      <div className="font-medium text-text-primary">Push Notifications</div>
                      <div className="text-sm text-text-secondary">Receive browser push notifications</div>
                    </div>
                  </div>
                  <Input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 glass-surface rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="MessageSquare" size={20} className="text-primary" />
                    <div>
                      <div className="font-medium text-text-primary">SMS Notifications</div>
                      <div className="text-sm text-text-secondary">Receive important alerts via SMS</div>
                    </div>
                  </div>
                  <Input
                    type="checkbox"
                    checked={settings.smsNotifications}
                    onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                  />
                </div>
              </div>
            </div>

            {/* Frequency Settings */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Notification Frequency</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'immediate', label: 'Immediate', desc: 'Get notified right away' },
                  { id: 'hourly', label: 'Hourly', desc: 'Digest every hour' },
                  { id: 'daily', label: 'Daily', desc: 'Daily summary' }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSettingChange('frequency', option.id)}
                    className={`
                      p-4 rounded-lg border-2 transition-all duration-200 text-left
                      ${settings.frequency === option.id
                        ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-text-secondary hover:text-text-primary'
                      }
                    `}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm opacity-80">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quiet Hours */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quiet Hours</h3>
              <div className="glass-surface rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-medium text-text-primary">Enable Quiet Hours</div>
                    <div className="text-sm text-text-secondary">Pause notifications during specified hours</div>
                  </div>
                  <Input
                    type="checkbox"
                    checked={settings.quietHours.enabled}
                    onChange={(e) => handleQuietHoursChange('enabled', e.target.checked)}
                  />
                </div>
                
                {settings.quietHours.enabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Start Time</label>
                      <Input
                        type="time"
                        value={settings.quietHours.start}
                        onChange={(e) => handleQuietHoursChange('start', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">End Time</label>
                      <Input
                        type="time"
                        value={settings.quietHours.end}
                        onChange={(e) => handleQuietHoursChange('end', e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Category Settings */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Category Preferences</h3>
              <div className="space-y-4">
                {Object.entries(settings.categories).map(([category, categorySettings]) => (
                  <div key={category} className="glass-surface rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={
                            category === 'job' ? 'Briefcase' :
                            category === 'learning' ? 'BookOpen' :
                            category === 'mentorship' ? 'Users' : 'Settings'
                          } 
                          size={20} 
                          className="text-primary" 
                        />
                        <div className="font-medium text-text-primary capitalize">
                          {category} Notifications
                        </div>
                      </div>
                      <Input
                        type="checkbox"
                        checked={categorySettings.enabled}
                        onChange={(e) => handleCategoryChange(category, 'enabled', e.target.checked)}
                      />
                    </div>
                    
                    {categorySettings.enabled && (
                      <div className="grid grid-cols-3 gap-4 ml-8">
                        <div className="flex items-center space-x-2">
                          <Input
                            type="checkbox"
                            checked={categorySettings.email}
                            onChange={(e) => handleCategoryChange(category, 'email', e.target.checked)}
                          />
                          <span className="text-sm text-text-secondary">Email</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="checkbox"
                            checked={categorySettings.push}
                            onChange={(e) => handleCategoryChange(category, 'push', e.target.checked)}
                          />
                          <span className="text-sm text-text-secondary">Push</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="checkbox"
                            checked={categorySettings.sms}
                            onChange={(e) => handleCategoryChange(category, 'sms', e.target.checked)}
                          />
                          <span className="text-sm text-text-secondary">SMS</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-white/10">
          <Button
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;