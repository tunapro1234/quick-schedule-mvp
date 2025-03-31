"use client";

import { useState, useEffect } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);
  const [isMounted, setIsMounted] = useState(false);

  // Only set active tab after component has mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a minimal structure during server-side rendering to avoid hydration issues
    return (
      <div>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className="border-transparent text-gray-500 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8"
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-6">
          {/* Render an empty placeholder during SSR */}
          <div className="min-h-[300px]"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
} 