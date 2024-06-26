import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useContext, useEffect, useState, useRef } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { context } from "../../App";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const BASEURL = "http://43.202.86.217/api/v1";
const theme = createTheme({
  typography: {
    fontFamily: 'PADO',
  },
});

function MainUser({ recommendedStudent }) {
  const { userId, SetUserId } = useContext(context);

  const navigate = useNavigate();

  const [state, SetState] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div
        key={recommendedStudent.memberId}
        className="recommendedStudentsDiv"
        onClick={(event) => {
          console.log(recommendedStudent.memberId);
          navigate(`/profile-user/${recommendedStudent.memberId}`);
        }}
        style={{ display:" flex", cursor: "pointer" }}
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
          <div >
            <span className="name">{recommendedStudent.nickname}</span>
              {/* <button
                cursor="pointer"
                className="interests"
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
              </button> */}
          </div>
          <hr
            color="#BBB"
            style={{
              width: "100%",
              margin: "-0.4rem 0rem",
            }}
          />
          <span style={{fontFamily: "C24", }}>{`#${recommendedStudent.life_pattern} #${recommendedStudent.cleanliness} #${recommendedStudent.smoking} #${recommendedStudent.inextrovert}`}</span>
          <div className="interests">상세보기</div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MainUser;
