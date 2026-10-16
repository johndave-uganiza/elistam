import Background from "../../components/common/Background";

function Home() {
  return (
    <>
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
                    Easily add, update, organize, and keep track of your
                    products and stock levels from one convenient place.
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
        </div>
      </Background>

      {/* NEW SECTION: Outside and below Background */}
      <section
        id="how-it-works"
        className="py-5"
        style={{
          backgroundColor: "#F8FAFC",
          color: "#1E293B",
        }}
      >
        <div className="container py-4">
          <div className="text-center mb-5">
            <span
              className="badge rounded-pill px-3 py-2 mb-3"
              style={{
                backgroundColor: "#D1FAE5",
                color: "#065F46",
                letterSpacing: "0.08em",
              }}
            >
              SIMPLE. SMART. EFFICIENT.
            </span>

            <h2 className="display-6 fw-bold mb-3">How ELISTAM Works</h2>

            <p className="text-secondary mx-auto" style={{ maxWidth: "600px" }}>
              Everything you need to manage your inventory, monitor sales, and
              make smarter business decisions.
            </p>
          </div>
          <div className="row g-4">
            {/* Step 1 */}
            <div className="col-12 col-md-4">
              <div
                className="card h-100 border-0 shadow-sm p-4"
                style={{ borderRadius: "20px" }}
              >
                <div className="mb-3">
                  <i
                    className="bi bi-box-seam"
                    style={{ fontSize: "36px", color: "#059669" }}
                  ></i>
                </div>

                <span className="text-success fw-bold mb-2">STEP 01</span>
                <h4 className="fw-bold">Manage Inventory</h4>
                <p className="text-secondary mb-0">
                  Organize products, update stock levels, and keep your
                  inventory information accurate.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-12 col-md-4">
              <div
                className="card h-100 border-0 shadow-sm p-4"
                style={{ borderRadius: "20px" }}
              >
                <div className="mb-3">
                  <i
                    className="bi bi-receipt"
                    style={{ fontSize: "36px", color: "#2563EB" }}
                  ></i>
                </div>

                <span className="text-primary fw-bold mb-2">STEP 02</span>
                <h4 className="fw-bold">Track Sales</h4>
                <p className="text-secondary mb-0">
                  Review sales activity and transaction records to understand
                  your business performance.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-12 col-md-4">
              <div
                className="card h-100 border-0 shadow-sm p-4"
                style={{ borderRadius: "20px" }}
              >
                <div className="mb-3">
                  <i
                    className="bi bi-graph-up-arrow"
                    style={{ fontSize: "36px", color: "#D97706" }}
                  ></i>
                </div>

                <span className="fw-bold mb-2" style={{ color: "#D97706" }}>
                  STEP 03
                </span>
                <h4 className="fw-bold">Grow Your Business</h4>
                <p className="text-secondary mb-0">
                  Use your sales and profit information to make informed
                  decisions and plan for growth.
                </p>
              </div>
            </div>
          </div>
          {/* Tech Stack Used */}
          <div
            className="text-center text-white mt-5 p-4 p-md-5 shadow"
            style={{
              borderRadius: "24px",
              background: "linear-gradient(135deg, #064E3B, #047857, #075985)",
            }}
          >
            <h2 className="fw-bold mb-3">Tech Stack Used</h2>

            <p
              className="text-white-50 mb-4 mx-auto"
              style={{ maxWidth: "550px" }}
            >
              Built with reliable technologies to deliver a smooth, efficient,
              and data-driven point-of-sale experience.
            </p>

            <div className="row justify-content-center g-3">
              {/* React.js */}
              <div className="col-12 col-sm-6 col-md-4">
                <div
                  className="h-100 p-4"
                  style={{
                    backgroundColor: "rgba(255,255,255,.12)",
                    border: "1px solid rgba(255,255,255,.2)",
                    borderRadius: "16px",
                  }}
                >
                  <i
                    className="bi bi-code-slash mb-3 d-block"
                    style={{ fontSize: "36px", color: "#61DAFB" }}
                  ></i>

                  <h4 className="fw-bold mb-2">React.js</h4>
                  <p className="text-white-50 mb-0">
                    Frontend development and interactive user interfaces.
                  </p>
                </div>
              </div>

              {/* .NET Core */}
              <div className="col-12 col-sm-6 col-md-4">
                <div
                  className="h-100 p-4"
                  style={{
                    backgroundColor: "rgba(255,255,255,.12)",
                    border: "1px solid rgba(255,255,255,.2)",
                    borderRadius: "16px",
                  }}
                >
                  <i
                    className="bi bi-gear-wide-connected mb-3 d-block"
                    style={{ fontSize: "36px", color: "#C4B5FD" }}
                  ></i>

                  <h4 className="fw-bold mb-2">.NET Core</h4>
                  <p className="text-white-50 mb-0">
                    Backend services, business logic, and API development.
                  </p>
                </div>
              </div>

              {/* SQL Server */}
              <div className="col-12 col-sm-6 col-md-4">
                <div
                  className="h-100 p-4"
                  style={{
                    backgroundColor: "rgba(255,255,255,.12)",
                    border: "1px solid rgba(255,255,255,.2)",
                    borderRadius: "16px",
                  }}
                >
                  <i
                    className="bi bi-database-fill mb-3 d-block"
                    style={{ fontSize: "36px", color: "#FCA5A5" }}
                  ></i>

                  <h4 className="fw-bold mb-2">SQL Server</h4>
                  <p className="text-white-50 mb-0">
                    Database management and reliable data storage.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Developer Contact */}{" "}
          <div
            className="text-center mt-4 p-4 p-md-5 shadow"
            style={{
              borderRadius: "24px",
              backgroundColor: "rgba(255,255,255,.96)",
              border: "1px solid rgba(5,150,105,.15)",
            }}
          >
            {" "}
            <span
              className="badge rounded-pill px-3 py-2 mb-3"
              style={{
                backgroundColor: "#D1FAE5",
                color: "#065F46",
                letterSpacing: "0.08em",
              }}
            >
              {" "}
              GET IN TOUCH{" "}
            </span>
            <h2 className="fw-bold mb-3">Developer Contact</h2>
            <p
              className="text-secondary mx-auto mb-4"
              style={{ maxWidth: "550px" }}
            >
              {" "}
              Have questions, suggestions, or feedback about ELISTAM? Feel free
              to reach out.{" "}
            </p>
            <div className="row justify-content-center g-3">
              {" "}
              {/* Developer Name */}{" "}
              <div className="col-12 col-md-4">
                {" "}
                <div className="p-3 h-100 rounded-4 bg-light">
                  {" "}
                  <i
                    className="bi bi-person-circle text-success mb-2"
                    style={{ fontSize: "30px" }}
                  ></i>{" "}
                  <h5 className="fw-bold">Developer</h5>{" "}
                  <p className="text-secondary mb-0"> Your Name </p>{" "}
                </div>{" "}
              </div>
              {/* Email */}{" "}
              <div className="col-12 col-md-4">
                {" "}
                <div className="p-3 h-100 rounded-4 bg-light">
                  {" "}
                  <i
                    className="bi bi-envelope-fill text-success mb-2"
                    style={{ fontSize: "30px" }}
                  ></i>{" "}
                  <h5 className="fw-bold">Email</h5>{" "}
                  <a
                    href="mailto:your.email@example.com"
                    className="text-success text-decoration-none"
                  >
                    {" "}
                    your.email@example.com{" "}
                  </a>{" "}
                </div>{" "}
              </div>
              {/* GitHub */}{" "}
              <div className="col-12 col-md-4">
                {" "}
                <div className="p-3 h-100 rounded-4 bg-light">
                  {" "}
                  <i
                    className="bi bi-github text-success mb-2"
                    style={{ fontSize: "30px" }}
                  ></i>{" "}
                  <h5 className="fw-bold">GitHub</h5>{" "}
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noreferrer"
                    className="text-success text-decoration-none"
                  >
                    {" "}
                    View GitHub Profile{" "}
                  </a>{" "}
                </div>{" "}
              </div>{" "}
            </div>
            <p className="text-secondary small mt-4 mb-0">
              {" "}
              © {new Date().getFullYear()} ELISTAM. Developed with care.{" "}
            </p>{" "}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
