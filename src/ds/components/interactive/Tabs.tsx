'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface TabsProps {
  defaultTab?: string;
  children: React.ReactNode;
  className?: string;
}

interface TabProps {
  value: string;
  label: string;
  children: React.ReactNode;
  icon?: string;
}

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextType | null>(null);

export default function Tabs({ defaultTab, children, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || '');
  
  // Get first tab as default if not specified
  React.useEffect(() => {
    if (!defaultTab && React.Children.count(children) > 0) {
      const firstChild = React.Children.toArray(children)[0] as React.ReactElement<TabProps>;
      if (firstChild && firstChild.props.value) {
        setActiveTab(firstChild.props.value);
      }
    }
  }, [defaultTab, children]);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { theme } = useTheme();
  
  const getListClasses = () => {
    const baseClasses = 'flex overflow-x-auto rounded-2xl p-2';
    
    if (theme === 'light') {
      return `${baseClasses} bg-white shadow-lg`;
    } else if (theme === 'colorful') {
      return `${baseClasses} bg-purple-900/30 backdrop-blur-lg border border-purple-400/30`;
    } else {
      return `${baseClasses} bg-gray-800`;
    }
  };

  return (
    <div className={`${getListClasses()} ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ 
  value, 
  children, 
  icon,
  className = '' 
}: { 
  value: string; 
  children: React.ReactNode; 
  icon?: string;
  className?: string;
}) {
  const context = React.useContext(TabsContext);
  const { theme } = useTheme();
  
  if (!context) {
    throw new Error('TabsTrigger must be used within Tabs');
  }

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  const getTriggerClasses = () => {
    const baseClasses = 'flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 whitespace-nowrap';
    
    if (isActive) {
      if (theme === 'light') {
        return `${baseClasses} bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg`;
      } else if (theme === 'colorful') {
        return `${baseClasses} bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-300 border border-cyan-400/50`;
      } else {
        return `${baseClasses} bg-gradient-to-r from-blue-600 to-purple-600 text-white`;
      }
    } else {
      if (theme === 'light') {
        return `${baseClasses} text-gray-600 hover:bg-gray-50`;
      } else if (theme === 'colorful') {
        return `${baseClasses} text-gray-300 hover:bg-purple-500/20`;
      } else {
        return `${baseClasses} text-gray-300 hover:bg-gray-700`;
      }
    }
  };

  return (
    <motion.button
      className={`${getTriggerClasses()} ${className}`}
      onClick={() => setActiveTab(value)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {icon && <span className="material-symbols text-lg">{icon}</span>}
      <span className="font-medium">{children}</span>
    </motion.button>
  );
}

export function TabsContent({ value, children, className = '' }: { value: string; children: React.ReactNode; className?: string }) {
  const context = React.useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsContent must be used within Tabs');
  }

  const { activeTab } = context;
  
  if (activeTab !== value) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Tab({ value, label, children, icon }: TabProps) {
  return (
    <>
      <TabsTrigger value={value} icon={icon}>
        {label}
      </TabsTrigger>
      <TabsContent value={value}>
        {children}
      </TabsContent>
    </>
  );
}
