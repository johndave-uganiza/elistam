import Background from "../../components/common/Background";

function Home() {
  return (
    <Background>
      <div className="container py-5">
        {/* Hero */}
        <div className="row justify-content-center">
          <div className="col-12">
            <div
              className="card border-0 shadow-lg text-white overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(6,78,59,.85), rgba(4,120,87,.80), rgba(3,105,161,.78))",
                borderRadius: "24px",
              }}
            >
              <div className="card-body text-center p-4 p-md-5">
                <span
                  className="badge rounded-pill px-3 py-2 mb-3"
                  style={{
                    backgroundColor: "#D1FAE5",
                    color: "#000",
                    border: "1px solid rgba(0, 0, 0, 0.08)",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    fontSize: "0.75rem",
                  }}
                >
                  ELISTAM - SMART POINT OF SALE SYSTEM
                </span>

                <h1
                  className="display-5 fw-bold mb-3 d-flex justify-content-center align-items-center flex-wrap gap-2"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <span>Manage Products.</span>
                  <span style={{ color: "#7CFFB2" }}>Track Profits.</span>
                  <span className="text-warning">Grow Smarter.</span>
                </h1>

                <p
                  className="text-white-50 fs-5 mb-0 mx-auto"
                  style={{ maxWidth: "650px" }}
                >
                  Inventory management, product listing, and sales tracking —
                  all in one simple place.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="row justify-content-center g-4 mt-3">
          {/* Products */}
          <div className="col-12 col-md-6">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{
                borderRadius: "20px",
                backgroundColor: "rgba(255,255,255,.94)",
              }}
            >
              <div className="card-body p-4 p-lg-5">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "16px",
                      backgroundColor: "rgba(25,135,84,.12)",
                    }}
                  >
                    <i
                      className="bi bi-box-seam text-success"
                      style={{ fontSize: "28px" }}
                    ></i>
                  </div>

                  <h3 className="fw-bold mb-0">Manage Products</h3>
                </div>

                <p className="text-secondary mb-0">
                  Easily add, update, organize, and keep track of your products
                  and stock levels from one convenient place.
                </p>
              </div>
            </div>
          </div>

          {/* Profit */}
          <div className="col-12 col-md-6">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{
                borderRadius: "20px",
                backgroundColor: "rgba(255,255,255,.94)",
              }}
            >
              <div className="card-body p-4 p-lg-5">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "16px",
                      backgroundColor: "rgba(255,193,7,.15)",
                    }}
                  >
                    <i
                      className="bi bi-graph-up-arrow text-warning"
                      style={{ fontSize: "28px" }}
                    ></i>
                  </div>

                  <h3 className="fw-bold mb-0">Track Your Profit</h3>
                </div>

                <p className="text-secondary mb-0">
                  Monitor your earnings, understand your performance, and make
                  smarter decisions based on your business data.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div className="text-center mt-5">
          <p className="text-black fw-semibold mb-1">
            Simple tools. Better decisions.
          </p>

          <small className="text-black-50">
            Everything you need to keep your business moving forward.
          </small>
        </div>
      </div>
    </Background>
  );
}

export default Home;
