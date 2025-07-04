import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const mockCredentials = {
    'john.doe@example.com': 'password123',
    'jane.smith@example.com': 'securepass456',
    'admin@hirehub.com': 'admin2024'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const expectedPassword = mockCredentials[formData.email];
      
      if (expectedPassword && expectedPassword === formData.password) {
        // Mock successful login
        const mockUser = {
          id: '1',
          name: formData.email === 'admin@hirehub.com' ? 'Admin User' : 'John Doe',
          email: formData.email,
          role: 'job-seeker',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        };
        
        localStorage.setItem('authToken', 'mock-jwt-token-12345');
        localStorage.setItem('userData', JSON.stringify(mockUser));
        
        // Trigger confetti animation
        const confettiEvent = new CustomEvent('showConfetti');
        window.dispatchEvent(confettiEvent);
        
        setTimeout(() => {
          window.location.href = '/job-seeker-dashboard';
        }, 1500);
      } else {
        setErrors({
          submit: `Invalid credentials. Try: ${Object.keys(mockCredentials)[0]} / ${Object.values(mockCredentials)[0]}`
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full ${errors.email ? 'border-error' : ''}`}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        <div>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full ${errors.password ? 'border-error' : ''}`}
            required
          />
          {errors.password && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.password}</span>
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <Input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4"
          />
          <span className="text-sm text-text-secondary">Remember me</span>
        </label>
        
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:text-primary-600 transition-colors duration-200"
        >
          Forgot password?
        </button>
      </div>

      {errors.submit && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
          <p className="text-sm text-error flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} />
            <span>{errors.submit}</span>
          </p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        iconName={isLoading ? undefined : "ArrowRight"}
        iconPosition="right"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;