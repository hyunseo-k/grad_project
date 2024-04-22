import { Link } from "react-router-dom";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useContext, useEffect, useState } from "react";

import { context } from "../../App";
import axios from "axios";

const NavLink = ({ style, link, name }) => {
  return (
    <Link
      to={link}
      style={{
        color: "var(--purple4)",
        padding: "1rem 2rem",
        textDecoration: "none",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        ...style,
      }}
    >
      {name}
    </Link>
  );
};

const NavLink2 = ({ style, link, name }) => {
  return <NavLink link={link} name={name} style={{ padding: "0rem" }} />;
};

const BASEURL = "http://43.202.86.217/api/v1";

export default function NavBar() {
  const { userId, SetUserId } = useContext(context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userType, SetUserType } = useContext(context);
  const [userName, setUserName] = useState("사용자");

  const GetUseInfo = async () => {
    try {
      const res = await axios({
        url: `/member/${userId}`,
        method: "get",
        baseURL: BASEURL,
      });

      if (true) setUserName(res.data.result.name);
    } catch (error) {
      console.log("can't use user info system", error);
    }
  };

  useEffect(() => {
    GetUseInfo();
  }, []);
  return (
    <div
      style={{
        position: "sticky",
        top: "0",
        width: "100vw",
        height: "0px",
        display: "flex",
        flexDirection: "column",
        zIndex: "10000",
      }}
    >
      <div
        style={{
          top: "0px",
          background: "var(--white)",
          boxShadow: "0px 10px 20px 0px #163020",
          width: "100vw",
          display: "flex",
          color: "var(--purple4)",
        }}
      >
        <Link to="/main" style={{ padding: "0.7rem 1.5rem" }}>
          <img src={"/img/logo_bottom.png"} style={{borderRadius: '50%', width: '80px'}} />
        </Link>
        <NavLink
          link={`/offer/${userType}/`}
          name={"매칭 목록"}
          style={{ marginLeft: "auto", fontFamily: "C24B", fontSize: 25, fontweight: "bold" }}
        />
        <div
          style={{
            padding: "1rem 2rem",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          <AccountCircleIcon fontSize="large" />
        </div>
      </div>
      {isModalOpen && (
        <div
          style={{
            color: "var(--purple4)",
            boxShadow: "0px 10px 12px 0px #163020",
            margin: "1rem 1rem 1rem auto",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            rowGap: "1.5rem",
            alignItems: "center",
          }}
          className="whiteContainer"
        >
          <div>
            안녕하세요, <b>{userName}님</b>
          </div>
          <hr
            color="var(--purple5)"
            style={{ width: "40%", borderRadius: "10px", margin: "-0.2rem" }}
          />
          <NavLink2
            link={
              userType === "student"
                ? `/profile-student/${userId}`
                : `/profile-company/${userId}`
            }
            name={"마이페이지"}
          />
          <NavLink2 link="/setting" name={"설정"} />
          <hr
            color="var(--purple5)"
            style={{
              width: "40%",
              borderRadius: "10px",
              margin: "-0.5rem",
            }}
          />
          <NavLink2 link="/" name={"로그아웃"} />
        </div>
      )}
    </div>
  );
}
