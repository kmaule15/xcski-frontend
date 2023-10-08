import { FC, useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { useLoadScript } from '@react-google-maps/api';

if (!process.env.REACT_APP_Google_Maps_API_KEY) {
  throw new Error('API key is missing. Please check your .env file.');
}
const apiKey = process.env.REACT_APP_Google_Maps_API_KEY;

interface Props {}
//hardcoded trails for now
const trails = [
  { name: "Governor Dodge State Park", location: "4175 WI-23, Dodgeville, WI 53533" },
  { name: "Hixon Forest", location: "La Crosse, WI 54601" },
  { name: "Justin Trails Resort", location: "7452 Kathryn Ave, Sparta, WI 54656" },
];

const SearchBarComponent : FC<Props> = (props): JSX.Element => {
  const [results, setResults] = useState<{ name: string; location: string }[]>();
  const [selectedTrail, setSelectedTrail] = useState<{
    name: string;
    location: string;
  }>();
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  let service;

  useEffect(() => {
    if (isLoaded && !loadError && window.google) {
      service = new window.google.maps.places.PlacesService(document.createElement('div'));
    }
  }, [isLoaded, loadError]);

  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
  const handleChange: changeHandler = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setResults([]);
    //improve filtering later
    var targetValue = target.value.toLowerCase()
    const filteredValue = trails.filter((trail) =>
      trail.name.toLowerCase().includes(targetValue) || trail.location.toLowerCase().includes(targetValue)
    );
    setResults(filteredValue);
  };

return (
    <SearchBar
    results={results}
    value={selectedTrail?.name}
    renderItem={(trail: any) => 
        <div>
            <p>{trail.name}</p>
            <p>{trail.location}</p>
        </div>
    }
    onChange={handleChange}
    onSelect={(trail: any) => setSelectedTrail(trail)}
    />
)
};

export default SearchBarComponent;
