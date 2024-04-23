import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Register.css";

import { context } from "../../App";
import LoginLayout from "../../components/layout/LoginLayout";

const BASEURL = "http://localhost:8000/";

function Register() {
  const { userId, SetUserId } = useContext(context);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (!errors.password2 && !errors.id) {
      PostRegister(data.id, data.password, data.nickname);
    }
    const { id, password, nickname } = data;
  };

  const PostRegister = async (id, password, nickname) => {
    try {
      const res = await axios({
        url: "/Register",
        method: "post",
        baseURL: BASEURL,
        data: {
          id: id,
          pw: password,
          nickname: nickname,
        },
      });
      console.log(nickname)
      console.log(res.data.result.memberId);
      if (res.data.isSuccess) {
        console.log(res.data.result.memberId);
        // SetUserId(res.data.result.memberId);
        navigate("/login");
      }
    } catch (error) {
      console.log("can't use Register system", error);
    }
    // console.log(errors)
  };

  return (
    <LoginLayout>
      <form
        style={{ color: "white" }}
        className="registerForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 style={{ fontSize: "2rem", fontFamily: "MBCM" }}>회원가입</h1>
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
          {...register("id", {
            required: "Required",
            pattern: {
              value: /^[^@]+@g\.skku\.edu$/,
              message: "@g.skku.edu 형식의 이메일이어야 합니다."
            }
          })}
          style={{ background: "white" }}
        />
        {errors.id && <p style={{color: '#FFB1B1', margin: 0,}}>{errors.id.message}</p>}
        {/* </div> */}
        <div
          style={{
            display: "flex",
            width: "300px",
            justifyContent: "flex-start",
            marginBottom: "-2rem",
          }}
        >
          <h4 className="label">닉네임</h4>
        </div>
        <input
          className="submitInput"
          type="text"
          {...register("nickname")}
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
            width: "300px",
            justifyContent: "flex-start",
            marginBottom: "-2rem",
          }}
        >
          <h4 className="label">비밀번호 확인</h4>
        </div>
        <input
          className="submitInput"
          type="password"
          {...register("password2", {
            validate: value =>
              value === password.current || "비밀번호와 비밀번호 확인이 일치하지 않습니다"
          })}
          style={{ background: "white" }}
        />
        {errors.password2 && <p style={{color: '#FFB1B1', margin: 0}}>{errors.password2.message}</p>}
        <div
          style={{
            display: "flex",
            columnGap: "1rem",
            marginBottom: "2rem",
            marginTop: "2rem",
          }}
        >
        </div>
        <input className="submitInput" type="submit" value="제출" />
      </form>
    </LoginLayout>
  );
}

export default Register;
