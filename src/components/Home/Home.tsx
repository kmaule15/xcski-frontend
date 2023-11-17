import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import BackgroundSlideshow from "./BGSlideshow";
const Home = () => {
  //start searchbar stuff
  const [trailName, setTrailName] = useState<string>("");
  const [trailId, setTrailId] = useState<number>(-1);
  const [trailLongitude, setTrailLongitude] = useState<number | null>(null);
  const [trailLatitude, setTrailLatitude] = useState<number | null>(null);
  useEffect(() => {
    onLoad();
  }, []);
  const [results, setResults] =
    useState<
      {
        name: string;
        location: string;
        id: number;
        longitude: number;
        latitude: number;
      }[]
    >();
  const [trails, setTrails] =
    useState<
      {
        name: string;
        location: string;
        id: number;
        longitude: number;
        latitude: number;
      }[]
    >();
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
      })
        .then((response) => response.json())
        .then((data) => setTrails(data));
    } catch (error) {
      //console.error("An error occured:", error);
    }
  };
  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
  const handleChange: changeHandler = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setResults([]);
    //improve filtering later
    var targetValue = target.value.toLowerCase();
    const filteredValue =
      trails &&
      trails.filter(
        (trail: {
          name: string;
          location: string;
          id: number;
          longitude: number;
          latitude: number;
        }) =>
          trail.name.toLowerCase().includes(targetValue) ||
          trail.location.toLowerCase().includes(targetValue)
      );
    setResults(filteredValue);
  };

  const handleSelect = (trail: any) => {
    setSelectedTrail(trail);
    setTrailName(trail?.name);
    setTrailId(trail?.id);
    setTrailLatitude(trail?.latitude);
    setTrailLongitude(trail?.longitude);
    console.log(trailLatitude); //to test, remove later
    console.log(trailLongitude); //to test, remove later
  };
  //end searchbar stuff

  return (
    <div>
      <BackgroundSlideshow />
      <div
        className="container justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <SearchBar
          results={results}
          value={trailName} //change to trailname maybe
          renderItem={(trail: any) => (
            <div>
              <p>{trail.name}</p>
              <p>{trail.location}</p>
            </div>
          )}
          onChange={handleChange}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
};

export default Home;
