import React from "react";
import PostsList from "./Posts/PostList";
import "./Community.css";
import WeatherWidget from "../Trail/WeatherWidget/WeatherWidget";
import EventsList from "./Events/EventList";

const Community = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-2 rounded-left">
          <EventsList />
        </div>
        <div className="col-md-7 rounded-middle">
          <div>
            <PostsList />
          </div>
        </div>
        <div className="col-sm-2 rounded-right right-column">
          <p>Right Column</p>
        </div>
      </div>
    </div>
  );
};

export default Community;
