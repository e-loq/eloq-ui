import React from 'react';
import logo from './logo.svg';
import './App.css';
import FileUpload from './FileUploader';

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Track & Trace Installation Assistance.</h1>
      <h2>Link e57 file</h2>
      <FileUpload/>
    </div>
  );
}

export default App;
