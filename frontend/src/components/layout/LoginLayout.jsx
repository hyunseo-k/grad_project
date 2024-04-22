export default function LoginLayout({ children }) {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #589458 1.4%, #304D30 39%, #163020 100%)',
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          background: 'linear-gradient(180deg, #589458 1.4%, #304D30 39%, #163020 100%)',
          flex: "1",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
      <div
        style={{
          background: "#EEF0E5",
          flex: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={"img/logo.png"} width={300} alt="logo" />
      </div>
    </div>
  );
}
