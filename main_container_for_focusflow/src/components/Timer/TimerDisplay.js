import React from 'react';
import { useFocusFlow } from '../../context/FocusFlowContext';

// PUBLIC_INTERFACE
/**
 * TimerDisplay component shows the current timer and session information
 */
const TimerDisplay = () => {
  const { 
    timeRemaining, 
    mode, 
    completedSessions, 
    sessionsBeforeLongBreak 
  } = useFocusFlow();
  
  // Format the time remaining into minutes:seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Generate mode text with appropriate styling
  const getModeText = () => {
    switch (mode) {
      case 'work':
        return <span className="mode-indicator-work">Stay Focused</span>;
      case 'shortBreak':
        return <span className="mode-indicator-shortBreak">Take a Short Break</span>;
      case 'longBreak':
        return <span className="mode-indicator-longBreak">Enjoy Your Long Break</span>;
      default:
        return <span>Unknown Mode</span>;
    }
  };
  
  // Generate session indicators (dots)
  const renderSessionIndicators = () => {
    // Create array of session indicators up to sessionsBeforeLongBreak
    return Array.from({ length: sessionsBeforeLongBreak }).map((_, index) => (
      <div 
        key={index} 
        className={`session-dot ${index < completedSessions % sessionsBeforeLongBreak ? 'completed' : ''}`}
        title={`Session ${index + 1}`}
      />
    ));
  };
  
  return (
    <>
      <div className="timer-mode">
        {getModeText()}
      </div>
      <div className="timer-display" aria-live="polite">
        {formatTime(timeRemaining)}
      </div>
      <div className="session-info">
        <span>Session {Math.floor(completedSessions / sessionsBeforeLongBreak) + 1}</span>
        <div className="session-count">
          {renderSessionIndicators()}
        </div>
      </div>
    </>
  );
};

export default TimerDisplay;
