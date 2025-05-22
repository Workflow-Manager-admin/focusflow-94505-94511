import React from 'react';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import { useFocusFlow } from '../../context/FocusFlowContext';
import './Timer.css';

// PUBLIC_INTERFACE
/**
 * Timer component combines the display and controls for the Pomodoro timer
 */
const Timer = () => {
  const { mode } = useFocusFlow();
  
  const getSessionBannerText = () => {
    switch (mode) {
      case 'work':
        return 'Focus Session';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return 'Unknown Mode';
    }
  };
  
  return (
    <div className={`timer-container ${mode}`}>
      <div className={`session-banner ${mode}`}>
        {getSessionBannerText()}
      </div>
      <TimerDisplay />
      <TimerControls />
    </div>
  );
};

export default Timer;
