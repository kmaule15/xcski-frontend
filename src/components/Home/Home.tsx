import React, { useState } from "react";
import BackgroundSlideshow from "./BGSlideshow";
import CreatedTrailsSearch from "../Trail/SearchTrails/CreatedTrailsSearch";

const Home = () => {
  return (
    <div>
      <BackgroundSlideshow />
      <div
        className="container justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <CreatedTrailsSearch />
      </div>
    </div>
  );
};

export default Home;
