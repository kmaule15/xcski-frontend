import React, { useState } from 'react';
import Trail from "../Trail";

const TrailSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // This is a placeholder for the list of trails from the database.
  // Replace this with the actual data.
  const trails = ['Trail 1', 'Trail 2', 'Trail 3'];

  return (
    <div style={{ width: '100%', position: 'relative', zIndex: 2 }}>
      <div style={{ width: '50%', position: 'absolute', top: '33%', zIndex: 3, display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search trails..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: '80%', textAlign: 'center' }}
        />
      </div>
      <div style={{ width: '25%', height: '100%', position: 'absolute', left: 0, top: '33%', zIndex: 3, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        {trails.map((trail, index) => (
          <p key={index}>{trail}</p>
        ))}
      </div>
      <div style={{ width: '100%', height: '100%', position: 'absolute', right: 0, zIndex: 1 }}>
        <Trail />
      </div>
    </div>
  );
};

export default TrailSearch;
