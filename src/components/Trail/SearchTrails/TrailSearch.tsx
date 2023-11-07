import React, { useState } from 'react';
import Trail from "../Trail";

const TrailSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search trails..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <p>This is the trail search page</p>
      <p>A display of trails</p>
      <Trail />
    </>
  );
};

export default TrailSearch;
