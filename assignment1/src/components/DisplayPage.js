import React from 'react';
import { useLocation } from 'react-router-dom';

function DisplayPage() {
  const { state } = useLocation();
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Submitted Data</h2>
      <ul>
        {Object.entries(state || {}).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayPage;
