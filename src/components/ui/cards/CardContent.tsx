'use client';

import React from 'react';
import Icon from '@/components/ui/Icon';

interface CardContentProps {
  icon?: React.ReactNode;
  iconClassName?: string;
  title: string;
  titleClassName?: string;
  subtitle?: string;
  subtitleClassName?: string;
  location?: string;
  date?: string;
  children?: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({
  icon,
  iconClassName = 'text-primary bg-primary/10',
  title,
  titleClassName = 'text-xl font-semibold text-primary mb-2 md:mb-0',
  subtitle,
  subtitleClassName = 'text-lg opacity-80 mb-3 flex items-center gap-2',
  location,
  date,
  children,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      {icon && typeof icon === 'string' ? (
        <div className={`p-3 rounded-lg ${iconClassName}`}>
          <Icon name={icon} size="xl" />
        </div>
      ) : icon ? (
        <span className={`material-symbols text-3xl p-3 rounded-lg ${iconClassName}`}>
          {icon}
        </span>
      ) : null}
      
      <div className="flex-1">        <div className="flex flex-col md:flex-row justify-between mb-4">
          <h4 className={titleClassName}>{title}</h4>
          {date && (
            <span className="text-muted-foreground flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
              <Icon name="schedule" size="xs" />
              {date}
            </span>
          )}
        </div>
        
        {location && (
          <h5 className={subtitleClassName}>
            <Icon name="location_on" size="xs" />
            {location}
          </h5>
        )}
        
        {subtitle && !location && (
          <h5 className={subtitleClassName}>
            {subtitle}
          </h5>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default CardContent; 