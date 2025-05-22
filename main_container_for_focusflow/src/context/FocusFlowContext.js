import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state for the Pomodoro timer
const initialState = {
  workDuration: 25 * 60, // 25 minutes in seconds
  shortBreakDuration: 5 * 60, // 5 minutes in seconds
  longBreakDuration: 15 * 60, // 15 minutes in seconds
  sessionsBeforeLongBreak: 4,
  currentSession: 0,
  isActive: false,
  isPaused: false,
  mode: 'work', // 'work', 'shortBreak', or 'longBreak'
  timeRemaining: 25 * 60, // Start with work duration
  completedSessions: 0,
};

// Action types for state updates
const actionTypes = {
  START_TIMER: 'START_TIMER',
  PAUSE_TIMER: 'PAUSE_TIMER',
  RESET_TIMER: 'RESET_TIMER',
  TICK: 'TICK',
  COMPLETE_SESSION: 'COMPLETE_SESSION',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  SKIP_BREAK: 'SKIP_BREAK',
  SKIP_TO_BREAK: 'SKIP_TO_BREAK',
};

// Reducer function to handle state updates
const focusFlowReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.START_TIMER:
      return {
        ...state,
        isActive: true,
        isPaused: false,
      };
    
    case actionTypes.PAUSE_TIMER:
      return {
        ...state,
        isPaused: true,
      };
    
    case actionTypes.RESET_TIMER:
      return {
        ...state,
        isActive: false,
        isPaused: false,
        timeRemaining: state.mode === 'work' 
          ? state.workDuration 
          : state.mode === 'shortBreak' 
            ? state.shortBreakDuration 
            : state.longBreakDuration,
      };
    
    case actionTypes.TICK:
      // If time is up, handle session completion in the next action
      if (state.timeRemaining <= 1) {
        return {
          ...state,
          timeRemaining: 0,
          isActive: false,
        };
      }
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
      };
    
    case actionTypes.COMPLETE_SESSION:
      const completedSessions = state.mode === 'work' 
        ? state.completedSessions + 1 
        : state.completedSessions;
      
      const newSession = state.mode === 'work' 
        ? state.currentSession + 1 
        : state.currentSession;
      
      // Determine next mode
      let nextMode;
      if (state.mode === 'work') {
        // After work, check if we need a long break or short break
        nextMode = (newSession % state.sessionsBeforeLongBreak === 0) 
          ? 'longBreak' 
          : 'shortBreak';
      } else {
        // After any break, go back to work mode
        nextMode = 'work';
      }

      // Calculate next time remaining based on the mode
      let nextTimeRemaining;
      if (nextMode === 'work') {
        nextTimeRemaining = state.workDuration;
      } else if (nextMode === 'shortBreak') {
        nextTimeRemaining = state.shortBreakDuration;
      } else { // longBreak
        nextTimeRemaining = state.longBreakDuration;
      }

      return {
        ...state,
        mode: nextMode,
        currentSession: nextMode === 'work' ? newSession : state.currentSession,
        completedSessions,
        timeRemaining: nextTimeRemaining,
        isActive: false,
        isPaused: false,
      };
    
    case actionTypes.UPDATE_SETTINGS:
      const { workDuration, shortBreakDuration, longBreakDuration, sessionsBeforeLongBreak } = action.payload;
      
      // Update time remaining if we're changing the duration of the current mode
      let updatedTimeRemaining = state.timeRemaining;
      if (state.mode === 'work' && workDuration !== undefined) {
        updatedTimeRemaining = workDuration;
      } else if (state.mode === 'shortBreak' && shortBreakDuration !== undefined) {
        updatedTimeRemaining = shortBreakDuration;
      } else if (state.mode === 'longBreak' && longBreakDuration !== undefined) {
        updatedTimeRemaining = longBreakDuration;
      }
      
      return {
        ...state,
        ...(workDuration !== undefined && { workDuration }),
        ...(shortBreakDuration !== undefined && { shortBreakDuration }),
        ...(longBreakDuration !== undefined && { longBreakDuration }),
        ...(sessionsBeforeLongBreak !== undefined && { sessionsBeforeLongBreak }),
        timeRemaining: !state.isActive ? updatedTimeRemaining : state.timeRemaining,
      };
      
    case actionTypes.SKIP_BREAK:
      if (state.mode === 'shortBreak' || state.mode === 'longBreak') {
        return {
          ...state,
          mode: 'work',
          timeRemaining: state.workDuration,
          isActive: false,
          isPaused: false,
        };
      }
      return state;
    
    case actionTypes.SKIP_TO_BREAK:
      if (state.mode === 'work') {
        const nextBreakMode = (state.currentSession + 1) % state.sessionsBeforeLongBreak === 0 
          ? 'longBreak' 
          : 'shortBreak';
        
        return {
          ...state,
          mode: nextBreakMode,
          currentSession: state.currentSession + 1,
          completedSessions: state.completedSessions + 1,
          timeRemaining: nextBreakMode === 'longBreak' 
            ? state.longBreakDuration 
            : state.shortBreakDuration,
          isActive: false,
          isPaused: false,
        };
      }
      return state;
      
    default:
      return state;
  }
};

// Create context
const FocusFlowContext = createContext();

// Context provider component
export const FocusFlowProvider = ({ children }) => {
  const [state, dispatch] = useReducer(focusFlowReducer, initialState);
  
  // Handle timer ticks
  useEffect(() => {
    let timer = null;
    
    if (state.isActive && !state.isPaused && state.timeRemaining > 0) {
      timer = setInterval(() => {
        dispatch({ type: actionTypes.TICK });
      }, 1000);
    } else if (state.timeRemaining === 0) {
      // When timer reaches zero, complete the session
      dispatch({ type: actionTypes.COMPLETE_SESSION });
      
      // Play notification sound (can be improved with actual sound)
      try {
        const notification = new Audio();
        notification.play().catch(e => console.log('Error playing notification sound', e));
      } catch (error) {
        console.log('Browser does not support Audio API');
      }
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [state.isActive, state.isPaused, state.timeRemaining]);
  
  // Define actions that components can dispatch
  const startTimer = () => dispatch({ type: actionTypes.START_TIMER });
  const pauseTimer = () => dispatch({ type: actionTypes.PAUSE_TIMER });
  const resetTimer = () => dispatch({ type: actionTypes.RESET_TIMER });
  const skipBreak = () => dispatch({ type: actionTypes.SKIP_BREAK });
  const skipToBreak = () => dispatch({ type: actionTypes.SKIP_TO_BREAK });
  
  const updateSettings = (settings) => {
    dispatch({ 
      type: actionTypes.UPDATE_SETTINGS, 
      payload: settings 
    });
  };
  
  // Value to be provided to consuming components
  const value = {
    ...state,
    startTimer,
    pauseTimer,
    resetTimer,
    skipBreak,
    skipToBreak,
    updateSettings,
  };
  
  return (
    <FocusFlowContext.Provider value={value}>
      {children}
    </FocusFlowContext.Provider>
  );
};

// Custom hook to use the FocusFlow context
export const useFocusFlow = () => {
  const context = useContext(FocusFlowContext);
  
  if (context === undefined) {
    throw new Error('useFocusFlow must be used within a FocusFlowProvider');
  }
  
  return context;
};
