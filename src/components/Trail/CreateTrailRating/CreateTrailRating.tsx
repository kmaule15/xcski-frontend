import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchBar from "../../SearchBar/SearchBar";
import Rating from "@mui/material/Rating";

const CreateTrailRating = () => {
  const [trailName, setTrailName] = useState<string>("");
  const [trailRating, setTrailRating] = useState<number| null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [trailId, setTrailId] = useState<number>(-1);
  useEffect(()=>{onLoad();}, []);
  //from searchbar
  const [results, setResults] = useState<{ name: string; location: string; id: number }[]>();
 const [trails, setTrails] = useState<{ name: string; location: string; id: number }[]>();
 const [selectedTrail, setSelectedTrail] = useState<{
    name: string;
    location: string;
    id: number;
  }>();
  const onLoad = async () => {
    console.log("Trails queried!");
    try {
      const response = await fetch("http://localhost:3000/trails", {
        method: "Get",
      }).then(response => response.json())
      .then(data => setTrails(data));

    } catch (error) {
      //console.error("An error occured:", error);
    }
  };
  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
  const handleChange: changeHandler = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setResults([]);
    //improve filtering later
    var targetValue = target.value.toLowerCase()
    const filteredValue = trails && trails.filter((trail: { name: string; location: string; id: number;}) =>
      trail.name.toLowerCase().includes(targetValue) || trail.location.toLowerCase().includes(targetValue)
    );
    setResults(filteredValue);
  };

  const handleSelect = (trail: any) => {
    setSelectedTrail(trail);
    setTrailName(trail?.name);
    setTrailId(trail?.id);
  };
  //end searchbar stuff

//use references to get trail name from component, add required keyword to inputs i require
  const clearForm = () => {
    setTrailName("");
    setSelectedTrail(undefined);
    setResults(undefined);
    setTrailId(-1);
    const output = document.querySelector("input[name='login']") as HTMLInputElement;
    const input = document.getElementById("searchbar") as HTMLInputElement;
    input!.value = '';
    output!.value = '';
    console.log(input!.value)
  };

//add date time checking
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      trailName,
      trailId,
      trailRating
    };
    //console.log(formData.trailName);
    //console.log(formData.trailId);
    try {
      const response = await fetch("http://localhost:3000/trailratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Trail successfully rated!");
        setIsSuccess(true);
        clearForm();
        setTimeout(() => setIsSuccess(false), 4000);
      }
    } catch (error) {
    }
  };

  return (
    <>
      <div className="form">
      <h1 className="text-center mb-4">Rate a Trail</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Trail Name</label>
                <SearchBar
                results={results}
                value={trailName}//change to trailname maybe
                renderItem={(trail: any) => 
                    <div>
                        <p>{trail.name}</p>
                        <p>{trail.location}</p>
                   </div>
                }
                onChange={handleChange}
                onSelect={handleSelect}
               />
              </div>

              <div className="mb-3">
                <label className="form-label">Rating</label>
                <br/>
                <Rating name="simple-controlled" value={trailRating} size="large"
                    onChange={(event, newValue) => {setTrailRating(newValue); }}/> 
              </div>

              {isSuccess && (
                <div className="alert alert-success">
                  Trail successfully rated!
                </div>
              )}
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </form>
            <br/>
          </div>
        </div>
      </div>
      </div>
      <div className="squares-background"></div>
    </>
  );
};

export default CreateTrailRating;
