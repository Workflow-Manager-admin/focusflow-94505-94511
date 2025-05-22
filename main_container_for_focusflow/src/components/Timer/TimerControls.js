import React from 'react';
import { useFocusFlow } from '../../context/FocusFlowContext';

// PUBLIC_INTERFACE
/**
 * TimerControls component provides buttons to control the timer
 */
const TimerControls = () => {
  const { 
    isActive, 
    isPaused, 
    startTimer, 
    pauseTimer, 
    resetTimer, 
    skipBreak, 
    skipToBreak,
    mode
  } = useFocusFlow();
  
  // Play button will either start or resume the timer
  const handlePlayPause = () => {
    if (isPaused || !isActive) {
      startTimer();
    } else {
      pauseTimer();
    }
  };
  
  // Reset the current timer
  const handleReset = () => {
    resetTimer();
  };
  
  // Skip current break or skip to break depending on the current mode
  const handleSkip = () => {
    if (mode === 'shortBreak' || mode === 'longBreak') {
      skipBreak();
    } else {
      skipToBreak();
    }
  };

  return (
    <div className="timer-controls">
      {/* Reset button */}
      <button 
        className="icon-button" 
        onClick={handleReset}
        aria-label="Reset timer"
        title="Reset timer"
      >
        {/* Simple text fallback for icon */}
        ⟳
      </button>
      
      {/* Play/Pause button */}
      <button 
        className="icon-button primary" 
        onClick={handlePlayPause}
        aria-label={isActive && !isPaused ? "Pause timer" : "Start timer"}
        title={isActive && !isPaused ? "Pause timer" : "Start timer"}
      >
        {/* Simple text fallback for icon */}
        {isActive && !isPaused ? "⏸" : "▶"}
      </button>
      
      {/* Skip button */}
      <button 
        className="icon-button" 
        onClick={handleSkip}
        aria-label={mode === 'work' ? "Skip to break" : "Skip break"}
        title={mode === 'work' ? "Skip to break" : "Skip break"}
      >
        {/* Simple text fallback for icon */}
        ⏭
      </button>
    </div>
  );
};

export default TimerControls;
