import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PreferencesStep = ({ data, onUpdate, onNext, onPrev }) => {
  const [salaryRange, setSalaryRange] = useState(data.salaryRange || { min: '', max: '' });
  const [currency, setCurrency] = useState(data.currency || 'USD');
  const [locationPreferences, setLocationPreferences] = useState(data.locationPreferences || []);
  const [remoteWork, setRemoteWork] = useState(data.remoteWork || '');
  const [workArrangement, setWorkArrangement] = useState(data.workArrangement || []);
  const [jobType, setJobType] = useState(data.jobType || []);
  const [companySize, setCompanySize] = useState(data.companySize || []);
  const [benefits, setBenefits] = useState(data.benefits || []);

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
  ];

  const remoteOptions = [
    { id: 'fully-remote', name: 'Fully Remote', icon: 'Home' },
    { id: 'hybrid', name: 'Hybrid (2-3 days remote)', icon: 'Calendar' },
    { id: 'occasional-remote', name: 'Occasional Remote', icon: 'MapPin' },
    { id: 'no-remote', name: 'On-site Only', icon: 'Building' }
  ];

  const workArrangementOptions = [
    { id: 'full-time', name: 'Full-time', icon: 'Clock' },
    { id: 'part-time', name: 'Part-time', icon: 'Clock3' },
    { id: 'contract', name: 'Contract', icon: 'FileText' },
    { id: 'freelance', name: 'Freelance', icon: 'Briefcase' },
    { id: 'internship', name: 'Internship', icon: 'GraduationCap' }
  ];

  const jobTypeOptions = [
    { id: 'permanent', name: 'Permanent', icon: 'Shield' },
    { id: 'temporary', name: 'Temporary', icon: 'Clock' },
    { id: 'seasonal', name: 'Seasonal', icon: 'Calendar' },
    { id: 'project-based', name: 'Project-based', icon: 'Target' }
  ];

  const companySizeOptions = [
    { id: 'startup', name: 'Startup (1-50)', icon: 'Rocket' },
    { id: 'small', name: 'Small (51-200)', icon: 'Users' },
    { id: 'medium', name: 'Medium (201-1000)', icon: 'Building' },
    { id: 'large', name: 'Large (1000+)', icon: 'Building2' }
  ];

  const benefitOptions = [
    { id: 'health-insurance', name: 'Health Insurance', icon: 'Heart' },
    { id: 'dental-vision', name: 'Dental & Vision', icon: 'Eye' },
    { id: 'retirement-401k', name: '401(k) / Retirement', icon: 'PiggyBank' },
    { id: 'paid-time-off', name: 'Paid Time Off', icon: 'Calendar' },
    { id: 'flexible-schedule', name: 'Flexible Schedule', icon: 'Clock' },
    { id: 'professional-development', name: 'Professional Development', icon: 'BookOpen' },
    { id: 'stock-options', name: 'Stock Options', icon: 'TrendingUp' },
    { id: 'gym-wellness', name: 'Gym & Wellness', icon: 'Dumbbell' },
    { id: 'childcare', name: 'Childcare Support', icon: 'Baby' },
    { id: 'transportation', name: 'Transportation', icon: 'Car' }
  ];

  const popularLocations = [
    'New York, NY', 'San Francisco, CA', 'Los Angeles, CA', 'Chicago, IL',
    'Boston, MA', 'Seattle, WA', 'Austin, TX', 'Denver, CO',
    'London, UK', 'Toronto, Canada', 'Berlin, Germany', 'Amsterdam, Netherlands'
  ];

  const toggleSelection = (item, selectedItems, setSelectedItems, maxSelection = null) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else if (!maxSelection || selectedItems.length < maxSelection) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const addLocation = (location) => {
    if (!locationPreferences.includes(location) && locationPreferences.length < 5) {
      setLocationPreferences([...locationPreferences, location]);
    }
  };

  const removeLocation = (location) => {
    setLocationPreferences(locationPreferences.filter(loc => loc !== location));
  };

  const handleNext = () => {
    const stepData = {
      salaryRange,
      currency,
      locationPreferences,
      remoteWork,
      workArrangement,
      jobType,
      companySize,
      benefits
    };
    onUpdate(stepData);
    onNext();
  };

  const isValid = salaryRange.min && salaryRange.max && remoteWork && workArrangement.length > 0;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl lg:text-3xl font-heading font-bold text-gradient">
          Job Preferences
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Tell us about your ideal job conditions so we can match you with the best opportunities.
        </p>
      </div>

      {/* Salary Expectations */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="DollarSign" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">
            Salary Expectations
          </h3>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-3 rounded-lg border border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.symbol} {curr.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Minimum Salary
              </label>
              <Input
                type="number"
                placeholder="50000"
                value={salaryRange.min}
                onChange={(e) => setSalaryRange(prev => ({ ...prev, min: e.target.value }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Maximum Salary
              </label>
              <Input
                type="number"
                placeholder="100000"
                value={salaryRange.max}
                onChange={(e) => setSalaryRange(prev => ({ ...prev, max: e.target.value }))}
                className="w-full"
              />
            </div>
          </div>

          {salaryRange.min && salaryRange.max && (
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-primary">
                Expected range: {currencies.find(c => c.code === currency)?.symbol}{parseInt(salaryRange.min).toLocaleString()} - {currencies.find(c => c.code === currency)?.symbol}{parseInt(salaryRange.max).toLocaleString()} per year
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Location Preferences */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">
            Location Preferences
          </h3>
          <span className="text-sm text-text-secondary">
            (Select up to 5)
          </span>
        </div>

        <div className="space-y-4">
          {locationPreferences.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {locationPreferences.map((location) => (
                <div
                  key={location}
                  className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20"
                >
                  <span className="text-sm">{location}</span>
                  <button
                    onClick={() => removeLocation(location)}
                    className="hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {popularLocations.map((location) => (
              <button
                key={location}
                onClick={() => addLocation(location)}
                disabled={locationPreferences.includes(location) || locationPreferences.length >= 5}
                className={`
                  p-2 text-sm rounded-lg border transition-all duration-200 text-left
                  ${locationPreferences.includes(location)
                    ? 'border-primary bg-primary/10 text-primary'
                    : locationPreferences.length >= 5
                      ? 'border-border bg-background-secondary text-text-tertiary cursor-not-allowed' :'border-border bg-surface hover:border-primary/50 hover:bg-primary/5'
                  }
                `}
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Remote Work Preference */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Home" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">
            Remote Work Preference
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {remoteOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setRemoteWork(option.id)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${remoteWork === option.id
                  ? 'border-primary bg-primary/10 text-primary shadow-glass-primary'
                  : 'border-border bg-surface hover:border-primary/50 hover:bg-primary/5'
                }
                hover:scale-105
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon name={option.icon} size={20} />
                <span className="font-medium text-sm">{option.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Work Arrangement */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Briefcase" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">
            Work Arrangement
          </h3>
          <span className="text-sm text-text-secondary">
            (Select all that apply)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {workArrangementOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleSelection(option.id, workArrangement, setWorkArrangement)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${workArrangement.includes(option.id)
                  ? 'border-primary bg-primary/10 text-primary shadow-glass-primary'
                  : 'border-border bg-surface hover:border-primary/50 hover:bg-primary/5'
                }
                hover:scale-105
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon name={option.icon} size={20} />
                <span className="font-medium text-sm">{option.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Job Type */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">
            Job Type
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {jobTypeOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleSelection(option.id, jobType, setJobType)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${jobType.includes(option.id)
                  ? 'border-primary bg-primary/10 text-primary shadow-glass-primary'
                  : 'border-border bg-surface hover:border-primary/50 hover:bg-primary/5'
                }
                hover:scale-105
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon name={option.icon} size={20} />
                <span className="font-medium text-sm">{option.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Company Size */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Building" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">
            Company Size Preference
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {companySizeOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleSelection(option.id, companySize, setCompanySize)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${companySize.includes(option.id)
                  ? 'border-primary bg-primary/10 text-primary shadow-glass-primary'
                  : 'border-border bg-surface hover:border-primary/50 hover:bg-primary/5'
                }
                hover:scale-105
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon name={option.icon} size={20} />
                <span className="font-medium text-sm">{option.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Gift" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">
            Important Benefits
          </h3>
          <span className="text-sm text-text-secondary">
            (Select your priorities)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {benefitOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleSelection(option.id, benefits, setBenefits)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${benefits.includes(option.id)
                  ? 'border-primary bg-primary/10 text-primary shadow-glass-primary'
                  : 'border-border bg-surface hover:border-primary/50 hover:bg-primary/5'
                }
                hover:scale-105
              `}
            >
              <div className="flex flex-col items-center space-y-2 text-center">
                <Icon name={option.icon} size={20} />
                <span className="font-medium text-xs">{option.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={onPrev}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Previous
        </Button>
        
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!isValid}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PreferencesStep;