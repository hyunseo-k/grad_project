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

export const EditStudentOne = ({ datas, patchData }) => {
  const [studentInfo, setStudentInfo] = useState(datas);
  const handleChange = ({ key, value }) => {
    console.log(key, value);
    setStudentInfo((prevCompanyInfo) => {
      const updatedCompanyInfo = { ...prevCompanyInfo, [key]: value };
      return updatedCompanyInfo;
    });
  };

  useEffect(() => {
    console.log(studentInfo);
  }, [studentInfo]);

  return (
    <React.Fragment>
      <WhiteContainer>
        <GridWrapper container>
          <GridElementWrapper item xs={full}>
            <h3>기본 정보</h3>
          </GridElementWrapper>
          <GridElementWrapper item xs={full}>
            <b>사진</b>
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
            <h4 style={{ marginBottom: "-0.1rem" }}>이름</h4>
          </GridElementWrapper>
          <GridElementWrapper item xs={full}>
            <TextField
              id="outlined"
              variant="outlined"
              value={studentInfo.name}
              onChange={(e) =>
                handleChange({ key: "name", value: e.target.value })
              }
            />
          </GridElementWrapper>
          <GridElementWrapper item xs={full}>
            <h4 style={{ marginBottom: "-0.1rem" }}>이메일</h4>
          </GridElementWrapper>
          <GridElementWrapper item xs={full}>
            <TextField
              id="outlined"
              variant="outlined"
              value={studentInfo.email}
              onChange={(e) =>
                handleChange({ key: "email", value: e.target.value })
              }
              error={
                !studentInfo.email
                  .toLowerCase()
                  .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  )
              }
            />
          </GridElementWrapper>
        </GridWrapper>

        <GridWrapper container>
          <GridElementWrapper item xs={full}>
            <h3>관심분야</h3>
          </GridElementWrapper>

          <GridElementWrapper item xs={full}>
            <GridWrapper container>
              {studentInfo.interestTagList.map((field, index) => (
                <GridElementWrapper
                  key={index}
                  style={{
                    margin: "0rem 1rem 1rem 0rem",
                    padding: "0.8rem 2rem",
                    backgroundColor: "var(--purple2)",
                    color: "var(--white)",
                    borderRadius: "2rem",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "1rem",
                  }}
                >
                  <div># {field} </div>
                  <CloseRoundedIcon
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {}}
                  />
                </GridElementWrapper>
              ))}
              <GridElementWrapper
                style={{
                  margin: "0rem 1rem 1rem 0rem",
                  padding: "0.8rem 1rem",
                  backgroundColor: "var(--purple2)",
                  color: "var(--white)",
                  borderRadius: "2rem",
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "row",
                  columnGap: "1rem",
                }}
              >
                <AddRoundedIcon
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {}}
                />
              </GridElementWrapper>
            </GridWrapper>
          </GridElementWrapper>
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
