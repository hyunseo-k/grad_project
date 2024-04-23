import React, { useState, useEffect, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Test from "./pages/Test/Test";
import Test2 from "./pages/Test/Test2";
import Register from "./pages/Register/Register";
import ProfileUser from "./pages/Profile/ProfileUser";
import Main from "./pages/Main/Main";
import OfferUser from "./pages/Offer/OfferUser";

import './Font.css';

export const context = createContext({});

function App() {
  const [userId, SetUserId] = useState("");
  return (
    <context.Provider
      value={{
        userId,
        SetUserId,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/test2" element={<Test2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/profile-user/:id" element={<ProfileUser />} />
          <Route
            path="/offer/:id"
            element={<OfferUser />} />

        </Routes>
      </Router>
    </context.Provider>
  );
}
export default App;
