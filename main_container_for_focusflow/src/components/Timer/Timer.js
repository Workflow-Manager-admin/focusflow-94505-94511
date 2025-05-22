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
  
  return (
    <div className={`timer-container ${mode}`}>
      <TimerDisplay />
      <TimerControls />
    </div>
  );
};

export default Timer;
