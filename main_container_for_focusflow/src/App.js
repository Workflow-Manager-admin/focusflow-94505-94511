import React from 'react';
import './App.css';
import FocusFlowContainer from './components/FocusFlowContainer';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">⏱</span> FocusFlow
            </div>
            <a href="https://github.com/kavia-ai" className="btn" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <FocusFlowContainer />
        </div>
      </main>
      
      <footer>
        <div className="container">
          <p>Powered by KAVIA AI - The Pomodoro Technique for enhanced productivity</p>
        </div>
      </footer>
    </div>
  );
}

export default App;