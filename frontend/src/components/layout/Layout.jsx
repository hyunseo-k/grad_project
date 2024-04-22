import React from "react";
import NavBar from "./NavBar";

export default function Layout({ children, style }) {
  return (
    <React.Fragment>
      <NavBar />
      <div
        style={{
          background: 'linear-gradient(180deg, #589458 1.4%, #304D30 39%, #163020 100%)',
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "10rem 8rem",
            maxWidth: "1200px",
            minWidth: "1200px",
            display: "flex",
            flexDirection: "column",
            ...style,
          }}
        >
          {children}
        </div>
      </div>
    </React.Fragment>
  );
}
