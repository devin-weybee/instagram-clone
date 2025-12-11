import React from "react";
import Login from "./Components/Auth/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import Layout from "./Components/Layout";
import Home from "./Components/HomePage/Home";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Home />} />
            <Route path="reels" element={<Home />} />
            <Route path="profile/:username" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
