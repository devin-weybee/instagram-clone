import React from "react";
import Login from "./Components/Auth/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import Layout from "./Components/Layout";
import Home from "./Components/HomePage/Home";
import PrivateRoute from "./Components/Auth/PrivateRoute";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
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
