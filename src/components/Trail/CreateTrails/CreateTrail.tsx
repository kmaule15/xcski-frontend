import React, { useState } from "react";

const CreateTrail = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [length, setLength] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  // const [typesAllowed, setTypesAllowed] = useState([""]);
  let typesAllowed = ["classic"];
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      name,
      description,
      location,
      difficulty,
      length,
      estimatedTime,
      typesAllowed,
    };

    try {
      const response = await fetch("http://localhost:3000/trails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Sucess");
      } else {
        console.error("Fail");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Create a Trail</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Location
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Difficulty
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="difficult">difficult</option>
          </select>
        </label>
        <br></br>
        <label>
          Length (in miles)
          <input
            type="text"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Estimated Time (in minutes)
          <input
            type="text"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
          />
        </label>
        <br></br>
        {/* <label>
          Types Allowed
          <input
            type="text"
            value={typesAllowed}
            onChange={(e) => setTypesAllowed(e.target.value)}
          />
        </label> */}
        <br />
        <button type="submit">Create Trail</button>
      </form>
    </>
  );
};

export default CreateTrail;
