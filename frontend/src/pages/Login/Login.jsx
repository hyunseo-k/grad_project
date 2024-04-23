import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Login.css";

import { context } from "../../App";
import LoginLayout from "../../components/layout/LoginLayout";

const BASEURL = "http://localhost:8000/";

function Login() {
  const { userId, SetUserId } = useContext(context);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    PostLogIn(data.id, data.password);
  };
  const PostLogIn = async (id, password) => {
    try {
      const res = await axios({
        url: "/login",
        method: "post",
        baseURL: BASEURL,
        data: {
          id: id,
          pw: password,
        },
      });
      console.log(res.data.result.memberId);
      if (res.data.isSuccess) {
        SetUserId(res.data.result.memberId);
        navigate("/main");
      }
    } catch (error) {
      console.log("can't use login system", error);
    }
  };

  return (
    <LoginLayout>
      <form
        style={{ color: "white" }}
        className="loginoutForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 style={{ fontSize: "2rem", fontFamily: "MBCM" }}>로그인</h1>
        <div
          style={{
            display: "flex",
            width: "300px",
            justifyContent: "flex-start",
            marginBottom: "-2rem",
          }}
        >
          <h4 className="label">이메일</h4>
        </div>
        <input
          className="submitInput"
          type="text"
          {...register("id")}
          style={{ background: "white" }}
        />
        {/* </div> */}
        <div
          style={{
            display: "flex",
            width: "300px",
            justifyContent: "flex-start",
            marginBottom: "-2rem",
          }}
        >
          <h4 className="label">비밀번호</h4>
        </div>
        <input
          className="submitInput"
          type="password"
          {...register("password")}
          style={{ background: "white" }}
        />
        {/* </div> */}
        <div
          style={{
            display: "flex",
            columnGap: "1rem",
            marginBottom: "2rem",
            marginTop: "2rem",
          }}
        >
          <button className="button">이메일 비밀번호 찾기</button>
          <button className="button" style={{cursor: 'pointer'}} onClick={() => navigate('/register')}>회원가입</button>
        </div>
        <input className="submitInput" type="submit" value="다음" />
      </form>
    </LoginLayout>
  );
}

export default Login;
