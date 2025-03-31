"use client";

import { useState } from 'react';
import { addDays, format, startOfWeek } from 'date-fns';
import React from 'react';

// Mock data for current schedule
const MOCK_SCHEDULE = [
  { id: '1', title: 'Team Meeting', day: 0, start: 10, end: 11, confirmed: true },
  { id: '2', title: 'Project Review', day: 1, start: 14, end: 15, confirmed: true },
  { id: '3', title: 'Client Call', day: 2, start: 11, end: 12, confirmed: true },
  { id: '4', title: 'Lunch with Alex', day: 3, start: 12, end: 13, confirmed: false },
  { id: '5', title: 'Product Demo', day: 4, start: 15, end: 16, confirmed: true },
];

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8AM to 7PM

export default function OverviewTab() {
  // Calculate the dates for the current week
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 1 }); // Start on Monday
  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(startDate, i)); // Monday to Friday
  
  // Function to get event for a specific time slot
  const getEventForSlot = (dayIndex: number, hour: number) => {
    return MOCK_SCHEDULE.find(event => 
      event.day === dayIndex && hour >= event.start && hour < event.end
    );
  };
  
  // Function to render the content of a time slot
  const renderTimeSlot = (dayIndex: number, hour: number) => {
    const event = getEventForSlot(dayIndex, hour);
    
    if (!event) {
      return null;
    }
    
    return (
      <div className={`h-full w-full flex items-center justify-center text-xs font-medium ${
        event.confirmed ? 'bg-primary-500 text-white' : 'bg-yellow-200 text-yellow-800 border border-yellow-300'
      }`}>
        {event.title}
      </div>
    );
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Current Schedule</h2>
      
      <div className="mb-6">
        <div className="grid grid-cols-6 gap-2 border-b pb-2 mb-2">
          <div className="font-medium text-gray-500">Time</div>
          {weekDays.map((date, i) => (
            <div key={i} className="font-medium text-gray-700 text-center">
              <div>{format(date, 'EEE')}</div>
              <div className="text-xs">{format(date, 'MMM d')}</div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-6 gap-2">
          {HOURS.map(hour => (
            <React.Fragment key={hour}>
              <div className="flex items-center text-sm text-gray-500">
                {hour % 12 || 12}{hour < 12 ? 'AM' : 'PM'}
              </div>
              
              {weekDays.map((_, dayIndex) => (
                <div
                  key={dayIndex}
                  className="h-12 rounded-md flex items-center justify-center transition-colors bg-gray-100"
                >
                  {renderTimeSlot(dayIndex, hour)}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mt-6">
        <div className="flex items-center">
          <div className="h-4 w-4 bg-primary-500 rounded-sm mr-2"></div>
          <span className="text-sm text-gray-700">Confirmed</span>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 bg-yellow-200 border border-yellow-300 rounded-sm mr-2"></div>
          <span className="text-sm text-gray-700">Pending</span>
        </div>
      </div>
    </div>
  );
} 