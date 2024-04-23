import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@material-ui/core/Grid';
import Button from "@mui/material/Button";

const theme = createTheme({
  typography: {
    fontFamily: 'C24',
  },
});

import { context } from "../../App";

import "./ProfileUser.css";
import Layout from "../../components/layout/Layout";
import {
  GridElementWrapper,
  GridElementWrapperRight,
  GridWrapper,
  WhiteContainer,
  WhiteContainerEdit,
  full,
  left,
  right,
} from "../../components/Profile/Layout";
import {
  EditUserOne,
  EditUserTwo,
} from "../../components/Profile/EditUser";

function ProfileUser() {
  const [datas, SetDatas] = useState({
    nickname: "성대차은우",
    introduce: "안녕하세요",
    preference:"담배 안피는 사람",
    life_pattern: "부엉이🦉",
    cleanliness: "청소광🧼",
    smoking: "비흡연자🚭",
    inextrovert: "인싸🤳",
  });

  const params = useParams();
  const id = params.id;
  const contextValue = useContext(context);
  const initialUserId = contextValue.userId || localStorage.getItem('userId') || "";
  const [userId, setUserId] = useState(initialUserId);

  useEffect(() => {
    if (userId !== null) {
      localStorage.setItem('userId', userId);
    }
  }, [userId]);

  const BASEURL = "http://localhost:8000/";

  const GetUserInfo = async () => {
    try {
      const res = await axios({
        url: `/member/${id}`,
        method: "get",
        baseURL: BASEURL,
      });

      console.log(params, userId, "hihihi");

      console.log(res.data.result);
      SetDatas(res.data.result);

      if (res.status === 200) SetDatas(res.data.result);
    } catch (error) {
      console.log("can't use user info system", error);
    }
  };

  useEffect(() => {
    GetUserInfo();
  }, []);
  
  const sendOffer = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/offer/${userId}/${id}`,
        {},
        {
          headers: {
            Authorization: userId,
          },
        }
      );
      console.log(response.data);
      if (response.data.isSuccess) {
        alert("요청이 전송되었습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const patchData = async (otherData) => {
    const data = { ...otherData };
    
    try {
      const response = await axios.patch(
        `http://localhost:8000/member-edit/${userId}`,
        data,
        {
          headers: {
            Authorization: userId,
          },
        }
      );
      console.log(response.data);
      SetDatas(data);
      console.log(userId, id, "hihihi");
      window.location.href = `/profile-user/${id}`;
      // console.log(userId);
      localStorage.setItem('userId', userId);
      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout style={{ rowGap: "2rem" }}>
        <WhiteContainerEdit
          isSelf={userId.toString() === id.toString()}
          overlayChildren={<EditUserOne datas={datas} patchData={patchData} />}
        >
          <GridWrapper container>
            <GridElementWrapper item xs={left}>
              <Box
                sx={{
                  width: "150px",
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "3px solid var(--purple4)",
                  borderRadius: "100px",
                  overflow: "hidden",
                }}
              >
                <AccountCircleIcon style={{ fontSize: 200 }} />
              </Box>
            </GridElementWrapper>

            <GridElementWrapperRight item xs={right}>
              <GridWrapper container style={{alignItems:'center'}}>
                <Typography variant="h4" component="div" style={{fontFamily: "PADO", fontSize: 50}}>
                  {datas.nickname}
                </Typography>
                <Typography variant="h4" component="div">
                  님의 프로필
                </Typography>
              </GridWrapper>

              
            </GridElementWrapperRight>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h6" component="div" style={{ fontFamily: "PADO", fontSize: 30, marginTop: 50 }}>
                  한줄 소개
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="div" style={{ fontSize: 20 }}>
                  {datas.introduce || '등록 필요'}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h6" component="div" style={{ fontFamily: "PADO", fontSize: 30, marginTop: 20 }}>
                  선호 룸메이트
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="div" style={{ fontSize: 20 }}>
                  {datas.preference || '등록 필요'}
                </Typography>
              </Grid>
            </Grid>

            <GridWrapper container>
              <GridElementWrapper item xs={4}>
                <Typography variant="h6" component="div" style={{fontFamily: "PADO", fontSize: 30, marginTop: 20,}}>
                  생활패턴
                  <br />
                  청결도
                  <br />
                  흡연여부
                  <br />
                  성향
                </Typography>
              </GridElementWrapper>
              <GridElementWrapper item xs={8}>
              <Typography variant="h6" component="div" style={{fontSize: 30, marginTop: 20,}}>
                {datas.life_pattern || '등록 필요'}
                <br />
                {datas.cleanliness || '등록 필요'}
                <br />
                {datas.smoking || '등록 필요'}
                <br />
                {datas.inextrovert || '등록 필요'}
              </Typography>
              </GridElementWrapper>
            </GridWrapper>
          </GridWrapper>
        </WhiteContainerEdit>
        {userId.toString() !== id.toString() && (
          <Button
            variant="contained"
            style={{
              marginLeft: "auto",
              padding: "0.7rem 3rem",
              cursor: "pointer",
              borderRadius: "3rem",
              backgroundColor: "#4CAF50",
            }}
            onClick={() => sendOffer()}
          >
            요청 보내기
          </Button>
        )}
      </Layout>
    </ThemeProvider>
  );
}

export default ProfileUser;