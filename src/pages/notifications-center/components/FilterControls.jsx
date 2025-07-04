import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterControls = ({ 
  onFilterChange, 
  onSortChange, 
  onSearch,
  activeFilters,
  searchQuery 
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');

  const filterOptions = [
    { id: 'all', label: 'All Notifications', icon: 'Bell' },
    { id: 'unread', label: 'Unread Only', icon: 'Eye' },
    { id: 'read', label: 'Read Only', icon: 'EyeOff' },
    { id: 'high-priority', label: 'High Priority', icon: 'AlertTriangle' },
    { id: 'has-attachments', label: 'With Attachments', icon: 'Paperclip' }
  ];

  const sortOptions = [
    { id: 'newest', label: 'Newest First', icon: 'ArrowDown' },
    { id: 'oldest', label: 'Oldest First', icon: 'ArrowUp' },
    { id: 'priority', label: 'By Priority', icon: 'Star' },
    { id: 'sender', label: 'By Sender', icon: 'User' }
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    onSearch(value);
  };

  const handleFilterToggle = (filterId) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(f => f !== filterId)
      : [...activeFilters, filterId];
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange([]);
    setLocalSearchQuery('');
    onSearch('');
  };

  const activeFilterCount = activeFilters.length + (searchQuery ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search and Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={16} className="text-text-tertiary" />
          </div>
          <Input
            type="search"
            placeholder="Search notifications..."
            value={localSearchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4"
          />
          {localSearchQuery && (
            <button
              onClick={() => {
                setLocalSearchQuery('');
                onSearch('');
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <Icon name="X" size={16} className="text-text-tertiary hover:text-text-primary" />
            </button>
          )}
        </div>

        {/* Filter Toggle Button */}
        <Button
          variant={isFilterOpen ? "primary" : "outline"}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          iconName="Filter"
          iconPosition="left"
          className="relative"
        >
          Filters
          {activeFilterCount > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-error text-white rounded-full flex items-center justify-center text-xs font-bold">
              {activeFilterCount}
            </div>
          )}
        </Button>
      </div>

      {/* Expandable Filter Panel */}
      {isFilterOpen && (
        <div className="glass-card border border-white/10 rounded-[1.25rem] p-4 animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Filter Options */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center space-x-2">
                <Icon name="Filter" size={16} />
                <span>Filter By</span>
              </h3>
              <div className="space-y-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleFilterToggle(option.id)}
                    className={`
                      w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                      ${activeFilters.includes(option.id)
                        ? 'bg-primary/20 text-primary border border-primary/30' :'hover:bg-white/10 text-text-secondary hover:text-text-primary'
                      }
                    `}
                  >
                    <Icon 
                      name={option.icon} 
                      size={16} 
                      className={activeFilters.includes(option.id) ? 'text-primary' : 'text-text-tertiary'}
                    />
                    <span className="text-sm font-medium">{option.label}</span>
                    {activeFilters.includes(option.id) && (
                      <Icon name="Check" size={14} className="text-primary ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center space-x-2">
                <Icon name="ArrowUpDown" size={16} />
                <span>Sort By</span>
              </h3>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => onSortChange(option.id)}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 text-text-secondary hover:text-text-primary transition-all duration-200"
                  >
                    <Icon name={option.icon} size={16} className="text-text-tertiary" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <Button
                variant="ghost"
                onClick={clearAllFilters}
                iconName="X"
                iconPosition="left"
                className="text-text-secondary hover:text-error"
              >
                Clear All Filters ({activeFilterCount})
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterControls;