import hero from "../../assets/images/hero.png";

function Home() {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <div>
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

      {/* Background Image */}
      <div
        className="position-absolute top-0 left-0 w-100 h-100 shadow"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          opacity: "100%",
          zIndex: "-1",
        }}
      ></div>
    </div>
  );
}

export default Home;
