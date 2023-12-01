import React from "react";
//import logo from "./logo.svg";
import "./App.css";
//import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import MyTrails from "./components/Trail/MyTrails/MyTrails";
import Community from "./components/Community/Community";
import Login from "./components/Login/Login";
import CreateAccount from "./components/Login/CreateAccount";
import Home from "./components/Home/Home";
import TrailSearch from "./components/Trail/SearchTrails/TrailSearch";
import CreateTrail from "./components/Trail/CreateTrails/CreateTrail";
import ResetPass from "./components/ResetPass/ResetPass";
import PWU from "./components/ResetPass/PWU";
import { AuthProvider } from "./AuthContext";
import CreateTrailUpdate from "./components/Trail/CreateTrailUpdate/CreateTrailUpdate";
import PostDetails from "./components/Community/Posts/PostDetails";
import MapComponent, { Trail } from './components/Trail/MapComponent'
import CreateTrailRating from "./components/Trail/CreateTrailRating/CreateTrailRating";
import EventDetails from "./components/Community/Events/EventDetails";
import EventInvite from "./components/Community/Events/EventInvite";
import TrailDetailPage from "./components/Trail/TrailDetailPage/TrailDetailPage";

function App() {
  return (
    <AuthProvider>
    <Routes>
    </Routes>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="trailsearch" element={<TrailSearch />} />
          <Route path="createtrail" element={<CreateTrail />} />
          <Route path="createtrailupdate" element={<CreateTrailUpdate />} />
          <Route path="mytrails" element={<MyTrails />} />
          <Route path="community" element={<Community />} />
          <Route path="ratetrail" element={<CreateTrailRating />} />
          <Route path="login" element={<Login />} />
          <Route path="createaccount" element={<CreateAccount />} />
          <Route path="signup" element={<CreateAccount />} />
          <Route path="resetpass" element={<ResetPass />} />
          <Route path="PWU/:token" element={<PWU />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/trails/:trailId" element={<TrailDetailPage />} />
          <Route
            path="/eventinvite/:eventId/:userId/:token"
            element={<EventInvite />}
          />
          <Route
            path="map"
            element={
              <MapComponent
                latitude={undefined}
                longitude={undefined}
                zoom={0}
                setSelectedTrail={function (trail: Trail | null): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
