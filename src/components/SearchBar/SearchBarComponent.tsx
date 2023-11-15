import { FC, useState } from "react";
import SearchBar from "./SearchBar";

interface Props {}
const SearchBarComponent : FC<Props> = (props): JSX.Element => {

 const [results, setResults] = useState<{ name: string; location: string }[]>();
 const [trails, setTrails] = useState<{ name: string; location: string }[]>();
 const [selectedTrail, setSelectedTrail] = useState<{
    name: string;
    location: string;
  }>();
  const onLoad = async () => {
    try {
      const response = await fetch("http://localhost:3000/trails", {
        method: "Get",
      }).then(response => response.json())
      .then(data => setTrails(data));

    } catch (error) {
      //console.error("An error occured:", error);
    }
    return [
      { name: "Governor Dodge State Park", location: "4175 WI-23, Dodgeville, WI 53533" },
      { name: "Hixon Forest", location: "La Crosse, WI 54601" },
      { name: "Justin Trails Resort", location: "7452 Kathryn Ave, Sparta, WI 54656" },
    ];
  };
  onLoad();
  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
  const handleChange: changeHandler = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setResults([]);
    //improve filtering later
    var targetValue = target.value.toLowerCase()
    const filteredValue = trails && trails.filter((trail: { name: string; location: string; }) =>
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
