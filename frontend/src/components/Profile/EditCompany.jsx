import React, { useState } from "react";
import { Accordion2 } from "../../components/Accordion";
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

export const EditCompanyOne = ({ datas, patchData }) => {
  const [companyInfo, setCompanyInfo] = useState(datas);
  const handleChange = ({ key, value }) => {
    console.log(key, value);
    setCompanyInfo((prevCompanyInfo) => {
      const updatedCompanyInfo = { ...prevCompanyInfo, [key]: value };
      return updatedCompanyInfo;
    });
  };

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
              <img
                src="/logo.jpg"
                style={{ width: "90%" }}
                alt={`로고 이미지 - ${companyInfo.name}`}
              />
            </div>
          </GridElementWrapper>

          <GridElementWrapper item xs={full}>
            <h4 style={{ marginBottom: "-0.1rem" }}>기업명</h4>
          </GridElementWrapper>
          <GridElementWrapper item xs={full}>
            <TextField
              id="outlined"
              variant="outlined"
              value={companyInfo.name}
              onChange={(e) =>
                handleChange({ key: "name", value: e.target.value })
              }
            />
          </GridElementWrapper>
          <GridElementWrapper item xs={full}>
            <h4 style={{ marginBottom: "-0.1rem" }}>기업소개</h4>
          </GridElementWrapper>
          <GridElementWrapper item xs={full}>
            <TextField
              id="outlined"
              variant="outlined"
              value={companyInfo.explanation}
              onChange={(e) =>
                handleChange({ key: "explanation", value: e.target.value })
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
              {companyInfo.tagList.map((field, index) => (
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
            onClick={() => patchData(companyInfo)}
          >
            제출
          </Button>
        </div>
      </WhiteContainer>
    </React.Fragment>
  );
};

export const EditCompanyTwo = ({ datas, patchData }) => {
  const [companyInfo, setCompanyInfo] = useState(datas);
  const handleChange = ({ key, value }) => {
    console.log(key, value);
    setCompanyInfo((prevCompanyInfo) => {
      const updatedCompanyInfo = { ...prevCompanyInfo, [key]: value };
      return updatedCompanyInfo;
    });
  };
  return (
    <React.Fragment>
      <WhiteContainer>
        <GridWrapper container>
          <GridElementWrapper item xs={full}>
            <h3>공고</h3>
          </GridElementWrapper>
          <GridElementWrapper item xs={full}>
            <h4 style={{ marginBottom: "-0.1rem" }}>공고명</h4>
          </GridElementWrapper>
          <GridElementWrapper item xs={full}>
            <TextField
              id="outlined"
              variant="outlined"
              value={companyInfo.position}
              onChange={(e) =>
                handleChange({ key: "position", value: e.target.value })
              }
            />
          </GridElementWrapper>

          <GridElementWrapper item xs={full}>
            <h4 style={{ marginBottom: "-0.1rem" }}>직무 설명</h4>
          </GridElementWrapper>
          <GridElementWrapper item xs={full}>
            <TextField
              id="outlined"
              variant="outlined"
              value={companyInfo.positionExplanation}
              onChange={(e) =>
                handleChange({
                  key: "positionExplanation",
                  value: e.target.value,
                })
              }
            />
          </GridElementWrapper>

          <GridElementWrapper item xs={full}>
            <h4 style={{ marginBottom: "-0.1rem" }}>졸업 후 필수 근무 기간</h4>
          </GridElementWrapper>
          <GridElementWrapper item xs={full}>
            <TextField
              id="outlined"
              variant="outlined"
              value={companyInfo.mustWorkingYear}
              onChange={(e) =>
                handleChange({
                  key: "mustWorkingYear",
                  value: e.target.value,
                })
              }
            />
          </GridElementWrapper>
          <GridElementWrapper item xs={full}>
            <h4 style={{ marginBottom: "-0.1rem" }}>
              방학 기간 내 의무 근로 여부
            </h4>
          </GridElementWrapper>
          <GridElementWrapper item xs={0}>
            <Checkbox
              id="outlined"
              variant="outlined"
              checked={companyInfo.isCompulsoryWork}
              onChange={(e) =>
                handleChange({
                  key: "isCompulsoryWork",
                  value: !companyInfo.isCompulsoryWork,
                })
              }
            />
          </GridElementWrapper>
          <GridElementWrapper item xs>
            의무 근무 필수
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
            onClick={() => patchData(companyInfo)}
          >
            제출
          </Button>
        </div>
      </WhiteContainer>
    </React.Fragment>
  );
};
