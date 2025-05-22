import React from 'react';
import { FocusFlowProvider } from '../context/FocusFlowContext';
import Timer from './Timer/Timer';
import Settings from './Settings/Settings';

// PUBLIC_INTERFACE
/**
 * Main container component for the FocusFlow application.
 * This component provides the layout and integrates all the sub-components
 * with the shared context.
 */
const FocusFlowContainer = () => {
  return (
    <FocusFlowProvider>
      <div className="focusflow-container">
        <div className="focusflow-header">
          <h1 className="title">FocusFlow</h1>
          <p className="description">
            Boost your productivity with the Pomodoro Technique
          </p>
        </div>

        <Timer />
        <Settings />

        <div className="focusflow-info">
          <h2 className="subtitle">How It Works</h2>
          <div className="info-cards">
            <div className="info-card">
              <h3>Focus Sessions</h3>
              <p>
                Work on your task intently during the focus session. 
                No distractions, no multitasking, just pure focus.
              </p>
            </div>
            <div className="info-card">
              <h3>Short Breaks</h3>
              <p>
                Take a brief break after each focus session.
                Stand up, stretch, or grab a glass of water.
              </p>
            </div>
            <div className="info-card">
              <h3>Long Breaks</h3>
              <p>
                After completing a set of focus sessions,
                reward yourself with a longer break to recharge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </FocusFlowProvider>
  );
};

export default FocusFlowContainer;
