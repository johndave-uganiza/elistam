import hero from "../../assets/images/hero.png";

function Background({ children }) {
  return (
    <div
      className="d-flex flex-fill"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  );
}

export default Background;
