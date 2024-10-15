import React from 'react';
import Chatbot from './components/Chatbot';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Chatbot Application</h1>
        <Chatbot />
      </header>
    </div>
  );
};

export default App;
