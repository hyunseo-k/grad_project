import React, { useEffect, useState } from "react";
import { Accordion2 } from "../../components/Accordion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import {
  GridElementWrapper,
  GridElementWrapperRight,
  GridWrapper,
  WhiteContainer,
  WhiteContainerOverlay,
  full,
  left,
  right,
} from "../../components/Profile/Layout";
import Layout from "../../components/layout/Layout";
import TextField from "@mui/material/TextField";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

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


export const EditUserOne = ({ datas, patchData }) => {
  
  const [studentInfo, setStudentInfo] = useState(datas);
  const handleChange = ({ key, value }) => {
    // console.log(key, value);
    setStudentInfo((prevCompanyInfo) => {
      const updatedCompanyInfo = { ...prevCompanyInfo, [key]: value };
      return updatedCompanyInfo;
    });
  };

  useEffect(() => {
    // console.log(studentInfo);
  }, [studentInfo]);

  return (
    <React.Fragment>
      <WhiteContainer>
        <GridWrapper container>
          <GridElementWrapper item xs={full}>
            <h3 style={{fontFamily: 'PADO', fontSize: 40}}>프로필 수정</h3>
          </GridElementWrapper>
          <GridElementWrapper item xs={full}>
            <b style={{fontFamily: 'PADO', fontSize: 28}}>사진</b>
          </GridElementWrapper>
          <GridElementWrapper item xs={full}>
            <div
              style={{
                width: "150px",
                height: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "3px solid var(--purple4)",
                borderRadius: "100px",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <AccountCircleIcon
                sx={{ fontSize: "180px", color: "var(--purple4)" }}
              />
            </div>
          </GridElementWrapper>

          <GridElementWrapper item xs={full}>
            <h4 style={{ marginBottom: "-0.1rem", fontFamily: 'PADO', fontSize: 28 }}>한줄 소개</h4>
          </GridElementWrapper>
          <GridElementWrapper item xs={full}>
            <TextField
              id="outlined"
              variant="outlined"
              value={studentInfo.introduce}
              onChange={(e) =>
                handleChange({ key: "introduce", value: e.target.value })
              }
            />
          </GridElementWrapper>
          <GridElementWrapper item xs={full}>
            <h4 style={{ marginBottom: "-0.1rem", fontFamily: 'PADO', fontSize: 28  }}>선호 룸메이트</h4>
          </GridElementWrapper>
          <GridElementWrapper item xs={full}>
            <TextField
              id="outlined"
              variant="outlined"
              value={studentInfo.preference}
              onChange={(e) =>
                handleChange({ key: "preference", value: e.target.value })
              }
            />
          </GridElementWrapper>
          
        </GridWrapper>

        <GridWrapper container>
          <GridElementWrapper item xs={full}>
            <h4 style={{ marginBottom: "0.3rem", fontFamily: 'PADO', fontSize: 28  }}>기타 정보</h4>
          </GridElementWrapper>
          <div>
            <select value={studentInfo.life_pattern} onChange={(e) => handleChange({ key: 'life_pattern', value: e.target.value })} style={{ fontSize: '20px' }}>
              {life_patternList.map((pattern) => (
                <option key={pattern} value={pattern}>
                  {pattern}
                </option>
              ))}
            </select>

            <select value={studentInfo.cleanliness} onChange={(e) => handleChange({ key: 'cleanliness', value: e.target.value })} style={{ fontSize: '20px' }}>
              {cleanlinessList.map((cleanliness) => (
                <option key={cleanliness} value={cleanliness}>
                  {cleanliness}
                </option>
              ))}
            </select>

            <select value={studentInfo.smoking} onChange={(e) => handleChange({ key: 'smoking', value: e.target.value })} style={{ fontSize: '20px' }}>
              {smokingList.map((smoking) => (
                <option key={smoking} value={smoking}>
                  {smoking}
                </option>
              ))}
            </select>

            <select value={studentInfo.inextrovert} onChange={(e) => handleChange({ key: 'inextrovert', value: e.target.value })} style={{ fontSize: '20px' }}>
              {inextrovertList.map((inextrovert) => (
                <option key={inextrovert} value={inextrovert}>
                  {inextrovert}
                </option>
              ))}
            </select>
          </div>

          
        </GridWrapper>
        <div
          style={{
            bottom: "0",
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            style={{
              marginLeft: "auto",
              padding: "0.7rem 3rem",
              cursor: "pointer",
              borderRadius: "3rem",
              backgroundColor: "var(--purple4)",
              fontSize: 20,
            }}
            onClick={() => patchData(studentInfo)}
          >
            제출
          </Button>
        </div>
      </WhiteContainer>
    </React.Fragment>
  );
};
