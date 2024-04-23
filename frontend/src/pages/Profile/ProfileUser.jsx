import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    life_pattern: "부엉이🦉",
    cleanliness: "청소광🧼",
    smoking: "비흡연자🚭",
    inextrovert: "인싸🤳",
  });

  const params = useParams();
  const id = params.id;

  const BASEURL = "http://43.202.86.217/api/v1";

  const GetUserInfo = async () => {
    try {
      const res = await axios({
        url: `/user/${id}`,
        method: "get",
        baseURL: BASEURL,
      });

      console.log(res.data.result);

      if (res.status === 200) SetDatas(res.data.result);
    } catch (error) {
      console.log("can't use user info system", error);
    }
  };

  useEffect(() => {
    GetUserInfo();
  }, []);

  const { userId } = useContext(context);
  const patchData = async (otherData) => {
    const data = { ...otherData };
    console.log(userId, data, "hihihi");
    try {
      const response = await axios.patch(
        `http://43.202.86.217/api/v1/user/${userId}`,
        data,
        {
          headers: {
            Authorization: userId,
          },
        }
      );
      console.log(response.data);
      SetDatas(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout style={{ rowGap: "2rem" }}>
        <WhiteContainerEdit
          isSelf={userId.toString() === id}
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
            <GridWrapper container>
              <GridElementWrapper item xs={4}>
                <Typography variant="h6" component="div" style={{fontFamily: "PADO", fontSize: 30, marginTop:50}}>
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
                <Typography variant="h6" component="div" style={{fontSize: 30, marginTop:50}}>
                  {datas.life_pattern}
                  <br />
                  {datas.cleanliness}
                  <br />
                  {datas.smoking}
                  <br />
                  {datas.inextrovert}
                </Typography>
              </GridElementWrapper>
            </GridWrapper>
          </GridWrapper>
        </WhiteContainerEdit>
        
      </Layout>
    </ThemeProvider>
  );
}

export default ProfileUser;