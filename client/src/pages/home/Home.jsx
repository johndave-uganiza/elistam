import hero from "../../assets/images/hero.png";

function Home() {
  return (
    /* Hero Section */
    <div
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        opacity: "100%",
        minHeight: "calc(100vh - 72px - 40px)",
      }}
    >
      <div className="p-3">
        <div className="container my-5 opacity-75">
          <div className="row justify-content-center">
            <div className="card bg-black col-10 p-3">
              <div className="card-body text-center shadow">
                <h2 className="text-white text-center fw-bold">
                  “Manage Products.{" "}
                  <span className="text-success">Track Profits.</span>{" "}
                  <span className="text-warning">Grow Smarter.</span>”
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container" style={{ opacity: "90%" }}>
          <div className="row justify-content-center g-4">
            <div className="card col-10 shadow bg-white">
              <div className="card-body text-center text-black">
                <h4 className="text-center">📦 Manage Stocks and Products</h4>
                <p>
                  Easily add, update, and organize your products in one place.
                </p>
              </div>
            </div>

            <div className="card col-10 shadow bg-white">
              <div className="card-body text-center text-black">
                <h4 className="text-center">💰 Track Profit</h4>
                <p>
                  Monitor your earnings and make smarter business decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
