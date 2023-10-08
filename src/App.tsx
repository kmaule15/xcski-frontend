import React from "react";
//import logo from "./logo.svg";
import "./App.css";
//import NavBar from "./components/NavBar/NavBar";
import {  BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Layout from "./Layout";
import MyTrails from "./components/Trail/MyTrails/MyTrails";
import Community from "./components/Community/Community";
import Login from "./components/Login/Login";
import CreateAccount from "./components/Login/CreateAccount";
import Home from "./components/Home/Home";
import TrailSearch from "./components/Trail/SearchTrails/TrailSearch";
import CreateTrail from "./components/Trail/CreateTrails/CreateTrail";
import ResetPass from "./components/ResetPass/ResetPass"
import PWU from "./components/ResetPass/PWU"
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="trailsearch" element={<TrailSearch />} />
        <Route path="createtrail" element={<CreateTrail />} />
        <Route path="mytrails" element={<MyTrails />} />
        <Route path="community" element={<Community />} />
        <Route path="login" element={<Login />} />
        <Route path="createaccount" element={<CreateAccount />} />
        <Route path="signup" element={<CreateAccount />} />
        <Route path="resetpass" element={<ResetPass />} />
        <Route path="PWU/:token" element={<PWU />} />
      </Route>
    </Routes>
    </AuthProvider>
  );
}

export default App;
