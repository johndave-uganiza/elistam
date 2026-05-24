import hero from "../../assets/images/hero.png";

function Background({ children }) {
  return (
    <div
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        minHeight: "calc(100vh - 72px - 40px)",
      }}
    >
      {children}
    </div>
  );
}

export default Background;
