"use client";

import { useState } from 'react';
import { addDays, format, startOfWeek } from 'date-fns';
import React from 'react';
import { useSchedule } from '../contexts/ScheduleContext';
import ConfirmDialog from './ConfirmDialog';

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8AM to 7PM

export default function OverviewTab() {
  const { events, isClient, removeEvent } = useSchedule();
  const [hoverEvent, setHoverEvent] = useState<string | null>(null);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  // Calculate the dates for the current week
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 1 }); // Start on Monday
  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(startDate, i)); // Monday to Friday
  
  // Function to get event for a specific time slot
  const getEventForSlot = (dayIndex: number, hour: number) => {
    return events.find(event => 
      event.day === dayIndex && hour >= event.start && hour < event.end
    );
  };
  
  // Function to handle event removal
  const handleRemoveEvent = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setEventToDelete(eventId);
    setConfirmDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (eventToDelete) {
      removeEvent(eventToDelete);
      setEventToDelete(null);
    }
    setConfirmDialogOpen(false);
  };
  
  const cancelDelete = () => {
    setEventToDelete(null);
    setConfirmDialogOpen(false);
  };
  
  // Function to render the content of a time slot
  const renderTimeSlot = (dayIndex: number, hour: number) => {
    if (!isClient) return null; // Don't render anything on server

    const event = getEventForSlot(dayIndex, hour);
    
    if (!event) {
      return null;
    }
    
    return (
      <div 
        className={`h-full w-full flex items-center justify-center text-xs font-medium text-center px-1 relative ${
          event.confirmed ? 'bg-primary-500 text-white' : 'bg-yellow-200 text-yellow-800 border border-yellow-300'
        }`}
        onMouseEnter={() => setHoverEvent(event.id)}
        onMouseLeave={() => setHoverEvent(null)}
      >
        {event.title}
        
        {hoverEvent === event.id && (
          <button
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center z-10 transform -translate-y-2 translate-x-2 hover:bg-red-600 transition-colors shadow-md"
            onClick={(e) => handleRemoveEvent(event.id, e)}
            aria-label="Remove meeting"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
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
        
        <div className="grid grid-cols-6 gap-2 relative z-0">
          {HOURS.map(hour => (
            <React.Fragment key={hour}>
              <div className="flex items-center text-sm text-gray-500">
                {hour % 12 || 12}{hour < 12 ? 'AM' : 'PM'}
              </div>
              
              {weekDays.map((_, dayIndex) => (
                <div
                  key={dayIndex}
                  className="h-12 rounded-md flex items-center justify-center transition-colors bg-gray-100 p-0 overflow-visible relative"
                >
                  {isClient && renderTimeSlot(dayIndex, hour)}
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
        <div className="flex items-center ml-4">
          <span className="text-xs text-gray-500 italic">Hover over a meeting to remove it</span>
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialogOpen}
        title="Remove Meeting"
        message="Are you sure you want to remove this meeting? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
} 