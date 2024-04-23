import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Main.css";

import { context } from "../../App";

import Layout from "../../components/layout/Layout";
import MainUser from "./MainUser";

const BASEURL = "http://43.202.86.217/api/v1";

function Main() {
  const { userId, SetUserId } = useContext(context);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    RecommendedStudents(
      data.nickname,
      data.life_pattern,
      data.cleanliness,
      data.smoking,
      data.inextrovert
    );
  };
  console.log(userId);

  const [recommendedStudents, SetRecommendedStudents] = useState([
    {
      nickname: "성대차은우",
      life_pattern: "부엉이🦉",
      cleanliness: "청소광🧼",
      smoking: "비흡연자🚭",
      inextrovert: "인싸🤳",
    },
  ]);

  const RecommendedStudents = async (
    interest,
    university,
    grade,
    department
  ) => {
    try {
      const res = await axios({
        url: "/member/search",
        method: "post",
        baseURL: BASEURL,
        data: {
          interest: life_pattern === "생활패턴 선택" ? null : life_pattern,
          university: cleanliness === "청결도 선택" ? null : cleanliness,
          grade: smoking === "흡연여부 선택" ? null : smoking,
          department: inextrovert === "성향 선택" ? null : inextrovert,
        },
      });
      if (res.data.isSuccess) {
        console.log(res.data.result.studentDtoList);
        SetRecommendedStudents(res.data.result.studentDtoList);
      }
    } catch (error) {
      console.log("can't use RecommendedStudents system", error);
    }
  };

  useEffect(() => {
    RecommendedStudents(null, "청소광🧼", null, null);
  }, []);

  const life_patternList = [
    "얼리버드🐦",
    "부엉이🦉",
  ];

  const cleanlinessList = [
    "청소는 나중에😊",
    "청소광🧼",
  ];

  const smokingList = [
    "흡연자🚬",
    "비흡연자🚭",
  ];

  const inextrovertList = [
    "인싸🤳",
    "아싸📚",
  ];

  return (
    <Layout>
      <form className="searchForm" onSubmit={handleSubmit(onSubmit)} style={{padding:10}}>
        <select className="life_pattern" {...register("interests")}>
          <option value={null}>생활패턴 선택</option>
          {life_patternList.map((category, index) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
        <select {...register("cleanliness")}>
          <option value={null}>청결도 선택</option>
          {cleanlinessList.map((category, index) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
        <select {...register("smoking")}>
          <option value={null}>흡연여부 선택</option>
          {smokingList.map((category, index) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
        <select {...register("inextrovert")}>
          <option value={null}>성향 선택</option>
          {inextrovertList.map((category, index) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
        <button className="submitInput" type="submit">
          <SearchIcon />
        </button>
      </form>

      {recommendedStudents.map((recommendedStudent) => (
        <MainUser recommendedStudent={recommendedStudent} />
      ))}
    </Layout>
  );
}

export default Main;
