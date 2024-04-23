import React, { useState } from "react";

export const Accordion = ({ title, content, color }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="body1"
        style={{
          cursor: "pointer",
          backgroundColor:
            color === "primary" ? "var(--white)" : "#B6C4B6",
          border: `2px solid ${
            color === "primary" ? "var(--purple4)" : "var(--purple2)"
          }`,
          color: color === "primary" ? "var(--purple4)" : "var(--white)",
          borderRadius: "2rem",
          padding: "0.8rem 2rem",
          display: "flex",
          zIndex: "2",
          alignItems: "center",
        }}
        onClick={handleAccordionClick}
      >
        {title}
        {/* <div style={{ marginLeft: "auto" }}>hello</div> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          style={{ marginLeft: "auto" }}
        >
          <path
            d="M1 7.10606L14 7.10606"
            stroke={color === "primary" ? "var(--purple4)" : "var(--white)"}
            stroke-width="2"
            stroke-linecap="round"
          />
          {!isOpen && (
            <path
              d="M7.5 1L7.5 14"
              stroke={color === "primary" ? "var(--purple4)" : "var(--white)"}
              stroke-width="2"
              stroke-linecap="round"
            />
          )}
        </svg>
      </div>
      {isOpen && (
        <div
          className="body2"
          style={{
            backgroundColor:
              color !== "primary" ? "var(--white)" : "#B6C4B6",
            border: `2px solid ${
              color !== "primary" ? "var(--purple4)" : "var(--purple1)"
            }`,

            borderRadius: "0rem 0rem 1rem 1rem ",
            padding: "1.2rem 2rem",
            marginTop: "-1.2rem",
            paddingTop: "2.5rem",
          }}
        >
          {content.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export const Accordion2 = ({ title, content, color }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="body1"
        style={{
          cursor: "pointer",
          backgroundColor:
            color === "primary" ? "var(--white)" : "#B6C4B6",
          border: `2px solid ${
            color === "primary" ? "var(--purple4)" : "var(--purple2)"
          }`,
          color: color === "primary" ? "var(--purple4)" : "var(--white)",
          borderRadius: "2rem",
          padding: "0.8rem 2rem",
          display: "flex",
          zIndex: "2",
          alignItems: "center",
        }}
        onClick={handleAccordionClick}
      >
        {title}
        {/* <div style={{ marginLeft: "auto" }}>hello</div> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          style={{ marginLeft: "auto" }}
        >
          <path
            d="M1 7.10606L14 7.10606"
            stroke={color === "primary" ? "var(--purple4)" : "var(--white)"}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {!isOpen && (
            <path
              d="M7.5 1L7.5 14"
              stroke={color === "primary" ? "var(--purple4)" : "var(--white)"}
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>
      </div>
      {isOpen && (
        <div
          className="body2"
          style={{
            backgroundColor:
              color !== "primary" ? "var(--white)" : "#B6C4B6",
            border: `2px solid ${
              color !== "primary" ? "var(--purple4)" : "var(--purple1)"
            }`,

            borderRadius: "0rem 0rem 1rem 1rem ",
            padding: "1.2rem 2rem",
            marginTop: "-1.2rem",
            paddingTop: "2.5rem",
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};
