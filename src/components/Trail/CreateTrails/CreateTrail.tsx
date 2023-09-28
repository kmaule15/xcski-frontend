import React, { useState } from "react";

const CreateTrail = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [length, setLength] = useState<number | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);
  const [typesAllowed, setTypesAllowed] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const clearForm = () => {
    setName("");
    setDescription("");
    setLocation("");
    setDifficulty("");
    setLength(null);
    setEstimatedTime(null);
    setTypesAllowed([]);
  };

  const handleTypesAllowedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    // add value to array if it's checked
    // otherise remove value
    if (event.target.checked) {
      setTypesAllowed((prevTypesAllowed) => [...prevTypesAllowed, value]);
    } else {
      setTypesAllowed((prevTypesAllowed) =>
        prevTypesAllowed.filter((item) => item !== value)
      );
    }
  };

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
        console.log("Trail successfully created!");
        setIsSuccess(true);
        clearForm();
        setTimeout(() => setIsSuccess(false), 4000);
      } else {
        console.error("Trail creation failed.");
      }
    } catch (error) {
      console.error("An error occured:", error);
    }
  };

  return (
    <>
      <h1 className="text-center mb-4">Create a Trail</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Difficulty</label>
                <select
                  className="form-select"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="">--Select--</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Difficult">Difficult</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Length (in miles)</label>
                <input
                  type="text"
                  className="form-control"
                  value={length ?? ""}
                  onChange={(e) => setLength(Number(e.target.value))}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Estimated Time (in minutes)
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={estimatedTime ?? ""}
                  onChange={(e) => setEstimatedTime(Number(e.target.value))}
                />
              </div>

              <p>Types of Skiing Allowed</p>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Classic"
                  onChange={handleTypesAllowedChange}
                  id="classicCheck"
                />
                <label className="form-check-label" htmlFor="classicCheck">
                  Classic
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Skate"
                  onChange={handleTypesAllowedChange}
                  id="skateCheck"
                />
                <label className="form-check-label" htmlFor="skateCheck">
                  Skate
                </label>
              </div>
              {isSuccess && (
                <div className="alert alert-success">
                  Trail successfully created!
                </div>
              )}
              <button type="submit" className="btn btn-primary mt-3">
                Create Trail
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTrail;
