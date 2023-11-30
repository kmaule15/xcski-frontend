import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatedTrailsSearch.css";
interface Trail {
  id: number;
  name: string;
  location: string;
}

const CreatedTrailsSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Trail[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const navigate = useNavigate();
  const resultContainer = useRef<HTMLDivElement>(null);

  const fetchTrails = async () => {
    try {
      // Adjust the URL as per your server configuration
      const response = await fetch("http://localhost:3000/trails");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const trails = await response.json();
      setResults(trails);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchTrails();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSelection = (index: number) => {
    const selectedTrail = results[index];
    navigate(`/trails/${selectedTrail.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Your key down logic here
  };

  useEffect(() => {
    if (focusedIndex >= 0 && resultContainer.current) {
      resultContainer.current.children[focusedIndex].scrollIntoView({
        block: "nearest",
      });
    }
  }, [focusedIndex]);

  const filteredResults = results.filter((trail) =>
    trail.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for a trail"
      />
      {searchTerm && filteredResults.length > 0 && (
        <div className="results-container" ref={resultContainer}>
          {filteredResults.map((trail, index) => (
            <div
              key={trail.id}
              onMouseDown={() => handleSelection(index)}
              style={{
                backgroundColor: index === focusedIndex ? "#e1ecff" : "",
              }}
              className="result-item"
            >
              {trail.name} <br /> {trail.location}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default CreatedTrailsSearch;
