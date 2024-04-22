import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useContext, useEffect, useState, useRef } from "react";

import { context } from "../../App";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const BASEURL = "http://43.202.86.217/api/v1";

function MainUser({ recommendedStudent }) {
  const { userId, SetUserId } = useContext(context);

  const navigate = useNavigate();

  const [state, SetState] = useState(false);

  return (
    <div
      key={recommendedStudent.memberId}
      className="recommendedStudentsDiv"
      onClick={(event) => {
        if (event.target.className === "suggestions") return;
        console.log(recommendedStudent.memberId);
        navigate(`/profile-student/${recommendedStudent.memberId}`);
      }}
      style={{ display: "flex", cursor: "pointer" }}
    >
      <AccountCircleIcon className="peson" sx={{ fontSize: "9rem" }} />
      <div
        className="infoDiv"
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "0.2rem",
        }}
      >
        <div className="firstLine">
          <span className="name">{recommendedStudent.name}</span>
            <button
              className="suggestions"
              onClick={(event) => {
                try {
                  axios({
                    url: "/offer",
                    method: "post",
                    baseURL: BASEURL,
                    headers: {
                      Authorization: userId,
                    },
                    data: {
                      offerType: "JOB",
                      receiverId: parseInt(
                        recommendedStudent.memberId.replace(/[^0-9]/g, "")
                      ),
                    },
                  }).then((res) => {
                    console.log(res);
                    SetState(true);
                  });
                } catch (error) {
                  console.log("can't use RecommendedStudents system", error);
                }
              }}
            >
              {state ? "완료" : "제안하기"}
            </button>
        </div>
        <hr
          color="#BBB"
          style={{
            width: "100%",
            margin: "-0.4rem 0rem",
          }}
        />
        <span className="info sub">{`${recommendedStudent.university} ${recommendedStudent.department} ${recommendedStudent.grade}학년`}</span>
        <span className="info">{recommendedStudent.shortIntroduce}</span>
        <div className="interests">{recommendedStudent.interest}</div>
      </div>
    </div>
  );
}

export default MainUser;
