import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import SearchBarComponent from "../../SearchBar/SearchBarComponent";

const CreateTrailUpdate = () => {
  const [trailName, setTrailName] = useState<string>("");
  const [startDate, setStartDate] = useState(new Date());
  const [description, setDescription] = useState<string>("");
  const [trailOpenPercentage, setTrailOpenPercentage] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const clearForm = () => {
    setTrailName("");
    setStartDate(new Date());
    setDescription("");
    setTrailOpenPercentage(null);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      trailName,
      startDate,
      description,
      trailOpenPercentage
    };
    try {
      const response = await fetch("http://localhost:3000/trailupdates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Trail update successfully created!");
        setIsSuccess(true);
        clearForm();
        setTimeout(() => setIsSuccess(false), 4000);
      } else {
        console.error("Trail update creation failed.");
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
                <label className="form-label">Trail Name</label>
                <SearchBarComponent ></SearchBarComponent>
                <input
                  type="text"
                  className="form-control"
                  value={trailName}
                  onChange={(e) => setTrailName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Date</label>
                <DatePicker selected={startDate} onChange={(date) => date && setStartDate(date)} showTimeSelect/>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Estimation of Open Trails (Percentage)
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={trailOpenPercentage ?? ""}
                  onChange={(e) => setTrailOpenPercentage(Number(e.target.value))}
                />
              </div>
              {isSuccess && (
                <div className="alert alert-success">
                  Trail successfully created!
                </div>
              )}
              <button type="submit" className="btn btn-primary mt-3">
                Create Trail Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTrailUpdate;
