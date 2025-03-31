"use client";

import React, { useState } from 'react';
import { addDays, format, startOfWeek } from 'date-fns';

interface UserCalendarProps {
  onComplete: (selectedSlots: string[]) => void;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8AM to 7PM

export default function UserCalendar({ onComplete }: UserCalendarProps) {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  
  // Calculate the dates for the current week
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 1 }); // Start on Monday
  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(startDate, i)); // Monday to Friday
  
  const toggleTimeSlot = (dayIndex: number, hour: number) => {
    const slotId = `${dayIndex}-${hour}`;
    setSelectedSlots(prev => 
      prev.includes(slotId) 
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    );
  };
  
  const handleComplete = () => {
    if (selectedSlots.length === 0) {
      alert('Please select at least one time slot');
      return;
    }
    
    onComplete(selectedSlots);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Select Available Time Slots</h3>
      
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
                <button
                  key={dayIndex}
                  onClick={() => toggleTimeSlot(dayIndex, hour)}
                  className={`
                    h-12 rounded-md flex items-center justify-center transition-colors
                    ${selectedSlots.includes(`${dayIndex}-${hour}`) 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                  `}
                >
                  {selectedSlots.includes(`${dayIndex}-${hour}`) ? 'Available' : ''}
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Selected {selectedSlots.length} time slots
        </div>
        <button
          type="button"
          onClick={handleComplete}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Complete
        </button>
      </div>
    </div>
  );
} 