import React from 'react';
import logo from './logo.svg';
import './App.css';
import FileUpload from './FileUploader';

function App() {
  return (
    <div className="App">
      <h2>Import e57 data</h2>
      <FileUpload/>
    </div>
  );
}

export default App;
