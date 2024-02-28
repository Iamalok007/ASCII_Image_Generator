// src/App.js
import React from 'react';
import ImageToAscii from './components/ImageToAscii';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Image to ASCII Converter</h1>
      </header>
      <main className="app-main">
        <ImageToAscii />
      </main>
      <footer className="app-footer">
        <p>Created with React</p>
      </footer>
    </div>
  );
}

export default App;
