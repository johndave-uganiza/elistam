import Background from "../../components/common/Background";

function Home() {
  return (
    /* Hero Section */
    <Background>
      <div className="container">
        <div className="row justify-content-center my-5 opacity-75">
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

        <div
          className="row justify-content-center g-4"
          style={{ opacity: "90%" }}
        >
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
              <p>Monitor your earnings and make smarter business decisions.</p>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default Home;
