import React, { useState } from 'react';
import { useFocusFlow } from '../../context/FocusFlowContext';
import './Settings.css';

// PUBLIC_INTERFACE
/**
 * Settings component for configuring the Pomodoro timer parameters
 */
const Settings = () => {
  const { 
    workDuration, 
    shortBreakDuration, 
    longBreakDuration, 
    sessionsBeforeLongBreak,
    updateSettings 
  } = useFocusFlow();
  
  // Convert seconds to minutes for the form
  const [formValues, setFormValues] = useState({
    workMinutes: Math.floor(workDuration / 60),
    shortBreakMinutes: Math.floor(shortBreakDuration / 60),
    longBreakMinutes: Math.floor(longBreakDuration / 60),
    sessionsBeforeLongBreak: sessionsBeforeLongBreak
  });
  
  // Show/hide settings form
  const [showSettings, setShowSettings] = useState(false);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Ensure value is a positive number
    const numericValue = Math.max(1, parseInt(value) || 1);
    
    setFormValues({
      ...formValues,
      [name]: numericValue
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert minutes back to seconds for the context
    updateSettings({
      workDuration: formValues.workMinutes * 60,
      shortBreakDuration: formValues.shortBreakMinutes * 60,
      longBreakDuration: formValues.longBreakMinutes * 60,
      sessionsBeforeLongBreak: formValues.sessionsBeforeLongBreak
    });
    
    // Close settings after save
    setShowSettings(false);
  };
  
  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2 className="settings-title">Timer Settings</h2>
        <button 
          className="settings-toggle"
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? '▲ Hide' : '▼ Show'}
        </button>
      </div>
      
      {showSettings && (
        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="settings-row">
            <div className="settings-form-group">
              <label className="settings-label" htmlFor="workMinutes">
                Focus Time (minutes)
              </label>
              <input
                type="number"
                id="workMinutes"
                name="workMinutes"
                className="settings-input"
                value={formValues.workMinutes}
                onChange={handleChange}
                min="1"
                max="60"
              />
            </div>
            
            <div className="settings-form-group">
              <label className="settings-label" htmlFor="shortBreakMinutes">
                Short Break (minutes)
              </label>
              <input
                type="number"
                id="shortBreakMinutes"
                name="shortBreakMinutes"
                className="settings-input"
                value={formValues.shortBreakMinutes}
                onChange={handleChange}
                min="1"
                max="30"
              />
            </div>
          </div>
          
          <div className="settings-row">
            <div className="settings-form-group">
              <label className="settings-label" htmlFor="longBreakMinutes">
                Long Break (minutes)
              </label>
              <input
                type="number"
                id="longBreakMinutes"
                name="longBreakMinutes"
                className="settings-input"
                value={formValues.longBreakMinutes}
                onChange={handleChange}
                min="1"
                max="60"
              />
            </div>
            
            <div className="settings-form-group">
              <label className="settings-label" htmlFor="sessionsBeforeLongBreak">
                Sessions before Long Break
              </label>
              <input
                type="number"
                id="sessionsBeforeLongBreak"
                name="sessionsBeforeLongBreak"
                className="settings-input"
                value={formValues.sessionsBeforeLongBreak}
                onChange={handleChange}
                min="1"
                max="10"
              />
            </div>
          </div>
          
          <button type="submit" className="settings-save">
            Save Settings
          </button>
        </form>
      )}
    </div>
  );
};

export default Settings;
