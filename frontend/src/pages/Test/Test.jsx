import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Test.css";
import "../../"
import { context } from "../../App";
// import LoginLayout from "../../components/layout/LoginLayout";

const BASEURL = "http://43.202.86.217/api/v1/member";

function Test() {
  const navigate = useNavigate();
  return (
    <div style={{
      fontFamily: 'DOSGothic',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(180deg, #589458 1.4%, #304D30 39%, #163020 100%)'
    }}>
      <h1 style={{ color: 'white', fontWeight: 'lighter', fontSize: 33 }}>나는 어떤 룸메이트?</h1>
      <h1 style={{ color: 'white', fontWeight: 'lighter', fontSize: 23, color: "#B6C4B6" }}>성균관대 ver.</h1>
      <div style={{
        width: '191px',
        height: '201.6px',
        flexShrink: 0,
        background: `url(/img/logo.png) lightgray 50% / cover no-repeat`,
        borderRadius: '50%',
        marginTop: '40px',
        marginBottom: '70px',
      }} />
      <button style={{ 
        fontFamily: 'DOSGothic',
        fontSize: '30px',
        marginTop: '20px',
        width: '251px',
        height: '60px',
        flexShrink: 0,
        borderRadius: '12px',
        background: '#EEF0E5',
        boxShadow: '#000000 0px 4px 4px',
        cursor: 'pointer',
      }} onClick={() => navigate('/test2')}>Click me!</button>
    </div>
  );
}

export default Test;