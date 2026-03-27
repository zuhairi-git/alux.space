'use client';

import React, { useState, useRef } from 'react';

export interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onChange?: (key: string) => void;
  className?: string;
}

export default function Tabs({ tabs, defaultTab, onChange, className = '' }: TabsProps) {
  const [activeKey, setActiveKey] = useState(defaultTab || tabs[0]?.key || '');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = tabs.findIndex((t) => t.key === activeKey);
  const activeTab = tabs[activeIndex];

  const handleSelect = (key: string) => {
    setActiveKey(key);
    onChange?.(key);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex: number | null = null;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        newIndex = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabs.length - 1;
        break;
    }

    if (newIndex !== null) {
      tabRefs.current[newIndex]?.focus();
      handleSelect(tabs[newIndex].key);
    }
  };

  return (
    <div className={className}>
      {/* Tab list */}
      <div
        role="tablist"
        aria-label="Tabs"
        className="flex gap-1 border-b border-[var(--card-border)] relative"
      >
        {tabs.map((tab, index) => {
          const isActive = tab.key === activeKey;
          return (
            <button
              key={tab.key}
              ref={(el) => { tabRefs.current[index] = el; }}
              role="tab"
              id={`tab-${tab.key}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.key}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleSelect(tab.key)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={[
                'relative inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium',
                'transition-colors duration-200 cursor-pointer',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 rounded-t-lg',
                isActive
                  ? 'text-[var(--primary)]'
                  : 'text-[var(--foreground)] opacity-60 hover:opacity-100',
              ].join(' ')}
            >
              {tab.icon}
              {tab.label}
              {/* Active indicator */}
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)] rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      {activeTab && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab.key}`}
          aria-labelledby={`tab-${activeTab.key}`}
          tabIndex={0}
          className="pt-4 focus-visible:outline-none"
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}
