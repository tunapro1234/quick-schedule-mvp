"use client";

import { useState } from 'react';
import { addDays, format, startOfWeek } from 'date-fns';
import React from 'react';

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8AM to 7PM

export default function PlannerView() {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [recipientEmail, setRecipientEmail] = useState('');
  
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
  
  const handleSendRequest = () => {
    if (selectedSlots.length === 0) {
      alert('Please select at least one time slot');
      return;
    }
    
    if (!recipientEmail) {
      alert('Please enter recipient email');
      return;
    }
    
    // In a real app, this would send the data to the backend
    console.log('Sending availability to:', recipientEmail);
    console.log('Selected slots:', selectedSlots);
    
    alert(`Availability sent to ${recipientEmail}`);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Your Availability</h2>
      
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
                      ? 'bg-primary-500 text-white' 
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
      
      <div className="mt-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Recipient Email
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="email"
            name="email"
            id="email"
            className="focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-2"
            placeholder="colleague@example.com"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
        </div>
      </div>
      
      <div className="mt-6">
        <button
          type="button"
          onClick={handleSendRequest}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Send Scheduling Request
        </button>
      </div>
    </div>
  );
} 