import React, { useState, useEffect, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Test from "./pages/Test/Test";
import Test2 from "./pages/Test/Test2";
import Register from "./pages/Register/Register";
import OfferCompany from "./pages/Offer/OfferCompany";
import OfferStudent from "./pages/Offer/OfferStudent";

import Main from "./pages/Main/Main";
import ProfileStudent from "./pages/Profile/ProfileStudent";
import ProfileCompany from "./pages/Profile/ProfileCompany";
import ProfileEditStudent from "./pages/Profile/ProfileEditStudent";
import ProfileEditCompany from "./pages/Profile/ProfileEditCompany";
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
          <Route
            path="/offer/:id"
            element={<OfferCompany />} />
          <Route path="/profile-student/:id" element={<ProfileStudent />} />
          <Route path="/profile-company/:id" element={<ProfileCompany />} />
          <Route
            path="/profile-edit-student"
            element={<ProfileEditStudent />}
          />
          <Route
            path="/profile-edit-company"
            element={<ProfileEditCompany />}
          />
        </Routes>
      </Router>
    </context.Provider>
  );
}
export default App;
