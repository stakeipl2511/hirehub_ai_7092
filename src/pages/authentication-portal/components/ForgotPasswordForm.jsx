import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ForgotPasswordForm = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
          <Icon name="Mail" size={32} className="text-success" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-text-primary">
            Check your email
          </h3>
          <p className="text-text-secondary">
            We've sent a password reset link to{' '}
            <span className="font-medium text-text-primary">{email}</span>
          </p>
        </div>
        
        <div className="p-4 bg-accent/20 rounded-lg border border-accent/30">
          <p className="text-sm text-text-secondary">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={() => {
                setIsSuccess(false);
                setEmail('');
              }}
              className="text-primary hover:text-primary-600 transition-colors duration-200"
            >
              try again
            </button>
          </p>
        </div>
        
        <Button
          variant="outline"
          onClick={onBack}
          iconName="ArrowLeft"
          iconPosition="left"
          fullWidth
        >
          Back to Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
          <Icon name="Key" size={24} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary">
          Forgot your password?
        </h3>
        <p className="text-text-secondary">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputChange}
            className={`w-full ${error ? 'border-error' : ''}`}
            required
          />
          {error && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{error}</span>
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            iconName={isLoading ? undefined : "Send"}
            iconPosition="right"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            iconName="ArrowLeft"
            iconPosition="left"
            fullWidth
          >
            Back to Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;