import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // This is the function that tries to connect to the backend
    const fetchHello = async () => {
      try {
        // We must use the FULL URL for the backend
        const response = await fetch('http://localhost:8080/api/hello');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.text();
        setMessage(data); // On success, set the message
      } catch (e) {
        // On failure, set the error
        setError('Failed to fetch from backend. Check console for CORS error.');
        console.error('There was a problem with the fetch operation:', e);
      }
    };

    fetchHello();
  }, []); // The empty array means this runs once when the component loads

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frontend-Backend Connection Test</h1>
        
        {/* Display the success or error message here */}
        {message && <p style={{ color: 'lightgreen' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

      </header>
    </div>
  );
}

export default App;