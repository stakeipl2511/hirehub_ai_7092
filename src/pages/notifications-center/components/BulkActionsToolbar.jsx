import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsToolbar = ({ 
  selectedCount, 
  onMarkAllRead, 
  onArchiveSelected, 
  onDeleteSelected,
  onSelectAll,
  onClearSelection,
  totalCount 
}) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleDeleteClick = () => {
    if (isConfirmingDelete) {
      onDeleteSelected();
      setIsConfirmingDelete(false);
    } else {
      setIsConfirmingDelete(true);
      setTimeout(() => setIsConfirmingDelete(false), 3000);
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="glass-card border border-white/10 rounded-[1.25rem] p-4 animate-scale-in">
      <div className="flex items-center justify-between">
        {/* Selection Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={14} className="text-white" />
            </div>
            <span className="text-sm font-medium text-text-primary">
              {selectedCount} of {totalCount} selected
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSelectAll}
              iconName="CheckSquare"
              iconPosition="left"
            >
              Select All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              iconName="X"
              iconPosition="left"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllRead}
            iconName="Eye"
            iconPosition="left"
            className="hover:bg-success/10 hover:text-success hover:border-success/30"
          >
            Mark Read
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onArchiveSelected}
            iconName="Archive"
            iconPosition="left"
            className="hover:bg-warning/10 hover:text-warning hover:border-warning/30"
          >
            Archive
          </Button>
          
          <Button
            variant={isConfirmingDelete ? "danger" : "outline"}
            size="sm"
            onClick={handleDeleteClick}
            iconName={isConfirmingDelete ? "AlertTriangle" : "Trash2"}
            iconPosition="left"
            className={`
              transition-all duration-300
              ${isConfirmingDelete 
                ? 'animate-pulse' :'hover:bg-error/10 hover:text-error hover:border-error/30'
              }
            `}
          >
            {isConfirmingDelete ? 'Confirm Delete' : 'Delete'}
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="w-full h-1 bg-background-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(selectedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BulkActionsToolbar;