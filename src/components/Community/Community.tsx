import React from "react";
import PostsList from "./Posts/PostList";
import './Community.css';
import WeatherWidget from "../Trail/WeatherWidget/WeatherWidget";

const Community = () => {
  return (
   <div className="container">
    <div className="row">
      <div className="col-sm-2 rounded-left">
        {/* Left Column */}
        <p>Left Column</p>
      </div>
      <div className="col-md-7 rounded-middle">
        {/* Middle Rectangle */}
        <div>
      <PostsList />
      {/* weather widget here just for showing use */}
      <WeatherWidget {...{lat: 1, lng: 2}}></WeatherWidget>
    </div>
      </div>
      <div className="col-sm-2 rounded-right right-column">
        {/* Right Column */}
        <p>Right Column</p>
      </div>
    </div>
  </div>
  )

};

export default Community;
