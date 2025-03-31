"use client";

import { useState } from 'react';
import { addDays, format, startOfWeek } from 'date-fns';
import React from 'react';
import UserCalendar from './UserCalendar';
import { useSchedule } from '../contexts/ScheduleContext';

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8AM to 7PM

export default function PlanningTab() {
  const { events, addRequest, addEvent, isClient } = useSchedule();
  const [step, setStep] = useState<'email' | 'userB' | 'compare' | 'confirm'>('email');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [meetingName, setMeetingName] = useState('');
  const [userBAvailableSlots, setUserBAvailableSlots] = useState<string[]>([]);
  const [overlappingSlots, setOverlappingSlots] = useState<string[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  
  // Calculate the dates for the current week
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 1 }); // Start on Monday
  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(startDate, i)); // Monday to Friday
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail) {
      alert('Please enter the email address of the person you want to schedule with');
      return;
    }
    setStep('userB');
  };
  
  const handleUserBSelection = (slots: string[]) => {
    setUserBAvailableSlots(slots);
    
    // Calculate overlapping slots (filtering out User A's busy slots)
    const availableSlots = [];
    
    for (let day = 0; day < 5; day++) {
      for (let hour = 8; hour < 20; hour++) {
        const slotId = `${day}-${hour}`;
        
        // Check if slot is in User B's available slots
        if (slots.includes(slotId)) {
          // Check if slot conflicts with User A's busy slots
          const isUserABusy = events.some(
            event => event.day === day && hour >= event.start && hour < event.end
          );
          
          if (!isUserABusy) {
            availableSlots.push(slotId);
          }
        }
      }
    }
    
    setOverlappingSlots(availableSlots);
    setStep('compare');
  };
  
  const toggleTimeSlot = (slotId: string) => {
    setSelectedSlots(prev => 
      prev.includes(slotId) 
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    );
  };
  
  const handleSendInvite = () => {
    if (selectedSlots.length === 0) {
      alert('Please select at least one time slot');
      return;
    }
    
    const finalMeetingName = meetingName.trim() || `Meeting with ${recipientEmail}`;
    
    // Format the selected slots for the request
    const formattedSlots = selectedSlots.map(slotId => {
      const [dayIndex, hourIndex] = slotId.split('-').map(Number);
      const date = addDays(startDate, dayIndex);
      const day = format(date, 'EEEE');
      const dateStr = format(date, 'yyyy-MM-dd');
      const time = `${hourIndex % 12 || 12}:00 ${hourIndex < 12 ? 'AM' : 'PM'}`;
      
      return {
        day,
        date: dateStr,
        time,
        dayIndex,
        hourIndex
      };
    });
    
    // Create a new request
    addRequest({
      sender: 'user@example.com', // Assuming current user is sender
      recipient: recipientEmail,
      status: 'pending',
      slots: formattedSlots
    });

    // Also add the selected time slots as pending events to the calendar
    selectedSlots.forEach(slotId => {
      const [dayIndex, hourIndex] = slotId.split('-').map(Number);
      
      // Add event to calendar with the custom meeting name
      addEvent({
        title: finalMeetingName,
        day: parseInt(dayIndex),
        start: parseInt(hourIndex),
        end: parseInt(hourIndex) + 1, // 1 hour meeting by default
        confirmed: false // This is a pending event
      });
    });
    
    // Alert and change step
    alert(`Meeting invitation sent to ${recipientEmail}`);
    setStep('confirm');
  };
  
  const renderSlot = (dayIndex: number, hour: number) => {
    const slotId = `${dayIndex}-${hour}`;
    const isOverlapping = overlappingSlots.includes(slotId);
    const isSelected = selectedSlots.includes(slotId);
    const isUserABusy = events.some(
      event => event.day === dayIndex && hour >= event.start && hour < event.end
    );
    
    if (isUserABusy) {
      return (
        <div className="h-12 rounded-md flex items-center justify-center bg-gray-300 text-gray-500 text-xs">
          Busy
        </div>
      );
    }
    
    if (isOverlapping) {
      return (
        <button
          onClick={() => toggleTimeSlot(slotId)}
          className={`h-12 rounded-md flex items-center justify-center transition-colors text-xs
            ${isSelected 
              ? 'bg-primary-600 text-white' 
              : 'bg-primary-100 text-primary-800 hover:bg-primary-200'}
          `}
        >
          {isSelected ? 'Selected' : 'Available'}
        </button>
      );
    }
    
    return (
      <div className="h-12 rounded-md flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
        Unavailable
      </div>
    );
  };
  
  if (step === 'email') {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Schedule a Meeting</h2>
        <p className="text-gray-600 mb-6">
          Enter the email address of the person you want to schedule with and a name for the meeting.
        </p>
        
        <form onSubmit={handleEmailSubmit} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-2"
              placeholder="colleague@example.com"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="meeting-name" className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Name (optional)
            </label>
            <input
              type="text"
              name="meeting-name"
              id="meeting-name"
              className="focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-2"
              placeholder="Weekly Check-in"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
            />
          </div>
          
          <div className="mt-4">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  if (step === 'userB') {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Select {recipientEmail}'s Available Times</h2>
        <p className="text-gray-600 mb-6">
          Please select when this user is available during the week.
        </p>
        
        <UserCalendar onComplete={handleUserBSelection} />
        
        <div className="mt-4">
          <p className="text-sm text-gray-500 italic">
            Note: In the full version, we would connect directly to their Google Calendar.
          </p>
        </div>
      </div>
    );
  }
  
  if (step === 'compare') {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Your Preferred Meeting Times</h2>
        <p className="text-gray-600 mb-6">
          Below are the times when both you and {recipientEmail} are available. Select your preferred slots.
        </p>
        
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
                  <div key={dayIndex}>
                    {renderSlot(dayIndex, hour)}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mt-6 mb-6">
          <div className="flex items-center">
            <div className="h-4 w-4 bg-primary-600 rounded-sm mr-2"></div>
            <span className="text-sm text-gray-700">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-primary-100 rounded-sm mr-2"></div>
            <span className="text-sm text-gray-700">Available</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-300 rounded-sm mr-2"></div>
            <span className="text-sm text-gray-700">Busy</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-100 rounded-sm mr-2"></div>
            <span className="text-sm text-gray-700">Unavailable</span>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="button"
            onClick={handleSendInvite}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            disabled={selectedSlots.length === 0}
          >
            Send Meeting Invite
          </button>
        </div>
      </div>
    );
  }
  
  if (step === 'confirm') {
    return (
      <div className="text-center py-10">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-3 text-lg font-medium text-gray-900">Meeting Request Sent!</h2>
        <p className="mt-2 text-sm text-gray-500">
          Your meeting request has been sent to {recipientEmail}. You'll be notified when they respond.
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => {
              setRecipientEmail('');
              setMeetingName('');
              setUserBAvailableSlots([]);
              setOverlappingSlots([]);
              setSelectedSlots([]);
              setStep('email');
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Schedule Another Meeting
          </button>
        </div>
      </div>
    );
  }
  
  return null;
} 