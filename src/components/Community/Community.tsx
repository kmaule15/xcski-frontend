import PostComments from "./PostComments";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Community.css';


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
        <p>Middle Rectangle</p>
      </div>
      <div className="col-sm-2 rounded-right right-column">
        {/* Right Column */}
        <p>Right Column</p>
      </div>
    </div>
  </div>
  );
};

export default Community;
