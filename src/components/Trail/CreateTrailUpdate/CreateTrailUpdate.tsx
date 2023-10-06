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

  const trail = React.useRef(null);
//use references to get trail name from component, add required keyword to inputs i require
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
      <h1 className="text-center mb-4">Create a Trail Update</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Trail Name</label>
                <SearchBarComponent></SearchBarComponent> 
              </div>

              <div className="mb-3">
                <label className="form-label">Date</label>
                <br/>
                <DatePicker className="form-control" selected={startDate} onChange={(date) => date && setStartDate(date)} dateFormat="MM/dd/yyyy h:mm aa" showTimeSelect maxDate={startDate}/>
              </div>

              <div className="mb-3">
                <label className="form-label"> Percent of Trails Open (estimated) </label>
                <input 
                  type="number" 
                  min="0" 
                  step="1"
                  max="100" 
                  className="form-control"
                  value={trailOpenPercentage?? ""}
                  onChange={(e) => setTrailOpenPercentage(Number(e.target.value))}
                  />
              </div>

              <div className="mb-3">
                <label className="form-label"> Description (any additional comments)</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
            <br/>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTrailUpdate;
