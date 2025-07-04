import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const subscriptionOptions = [
    {
      id: 'product-updates',
      label: 'Product Updates',
      description: 'New features, improvements, and platform announcements',
      icon: 'Zap'
    },
    {
      id: 'industry-insights',
      label: 'Industry Insights',
      description: 'Market trends, hiring statistics, and career advice',
      icon: 'TrendingUp'
    },
    {
      id: 'success-stories',
      label: 'Success Stories',
      description: 'User testimonials and career transformation stories',
      icon: 'Star'
    },
    {
      id: 'events-webinars',
      label: 'Events & Webinars',
      description: 'Upcoming events, workshops, and educational content',
      icon: 'Calendar'
    }
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePreferenceChange = (optionId) => {
    setPreferences(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (preferences.length === 0) {
      setError('Please select at least one subscription preference');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubscribed(true);
      setEmail('');
      setPreferences([]);
    } catch (error) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="glass-card p-12">
              <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Check" size={32} color="white" />
              </div>
              
              <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
                Welcome to Our Community!
              </h2>
              
              <p className="text-lg text-text-secondary mb-8">
                Thank you for subscribing to our newsletter. You'll receive your first update within the next few days.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  onClick={() => setIsSubscribed(false)}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Subscribe Another Email
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => window.open('https://linkedin.com/company/hirehub-ai', '_blank')}
                  iconName="Linkedin"
                  iconPosition="left"
                >
                  Follow on LinkedIn
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-text-secondary">
            Get the latest insights, product updates, and career tips delivered to your inbox
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email Input */}
              <div>
                <label htmlFor="newsletter-email" className="block text-sm font-medium text-text-primary mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  id="newsletter-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={error && !email ? 'border-error' : ''}
                />
              </div>

              {/* Subscription Preferences */}
              <div>
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  What would you like to receive? *
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subscriptionOptions.map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        preferences.includes(option.id)
                          ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 bg-surface'
                      }`}
                      onClick={() => handlePreferenceChange(option.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                          preferences.includes(option.id)
                            ? 'bg-primary text-white' :'bg-background text-text-secondary'
                        }`}>
                          <Icon name={option.icon} size={16} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${
                              preferences.includes(option.id)
                                ? 'text-primary' :'text-text-primary'
                            }`}>
                              {option.label}
                            </h4>
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              preferences.includes(option.id)
                                ? 'border-primary bg-primary' :'border-border'
                            }`}>
                              {preferences.includes(option.id) && (
                                <Icon name="Check" size={12} color="white" />
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-text-secondary mt-1">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center p-3 bg-error/10 border border-error/20 rounded-lg"
                >
                  <Icon name="AlertCircle" size={16} className="text-error mr-2" />
                  <span className="text-error text-sm">{error}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  iconName="Mail"
                  iconPosition="right"
                  className="sm:w-auto"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
                </Button>
                
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setEmail('');
                    setPreferences([]);
                    setError('');
                  }}
                  iconName="RotateCcw"
                  iconPosition="left"
                  className="sm:w-auto"
                >
                  Reset Form
                </Button>
              </div>

              {/* Privacy Notice */}
              <div className="text-center">
                <p className="text-xs text-text-tertiary">
                  By subscribing, you agree to our{' '}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>
                  . You can unsubscribe at any time.
                </p>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">25,000+</div>
            <div className="text-text-secondary">Newsletter Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">Weekly</div>
            <div className="text-text-secondary">Industry Insights</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
            <div className="text-text-secondary">Content Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;