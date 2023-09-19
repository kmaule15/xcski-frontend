import React, {useState} from 'react';

const SearchBar = () => {
 const [searchInput, setSearchInput] = useState("");

 //hardcoded trails
 const trails = [
  { name: "Governor Dodge State Park", location: "4175 WI-23, Dodgeville, WI 53533" },
  { name: "Hixon Forest", location: "La Crosse, WI 54601" },
  { name: "Justin Trails Resort", location: "7452 Kathryn Ave, Sparta, WI 54656" },
];

const handleChange = (e: any) => {
  setSearchInput(e.target.value);
};


return <div>
  <div className="input-group">
  <input
   type="search"
   className="form-control"
   placeholder="Search for a location or trail"
   onChange={handleChange}
   value={searchInput} />
  </div>
</div>
};

export default SearchBar;
