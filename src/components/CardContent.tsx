'use client';

import React from 'react';

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
      {icon && (
        <span className={`material-symbols text-3xl p-3 rounded-lg ${iconClassName}`}>
          {icon}
        </span>
      )}
      
      <div className="flex-1">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <h4 className={titleClassName}>{title}</h4>
          {date && (
            <span className="text-theme opacity-70 flex items-center gap-2">
              <span className="material-symbols text-sm">schedule</span>
              {date}
            </span>
          )}
        </div>
        
        {location && (
          <h5 className={subtitleClassName}>
            <span className="material-symbols text-sm">location_on</span>
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