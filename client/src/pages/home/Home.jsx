import { useEffect } from "react";
import Background from "../../components/common/Background";
import "@/assets/css/pages/Home.css";

function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-on-scroll");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Background>
        <div
          className="container py-5 home-container"
          style={{ opacity: "92%" }}
        >
          {/* Hero Section */}
          <div className="row justify-content-center align-items-center mb-5">
            <div className="col-12">
              <div className="card border-0 shadow-lg text-white overflow-hidden hero-card">
                <div className="card-body text-center p-4 p-md-5 hero-content">
                  <span className="rounded-pill px-3 py-2 hero-badge d-inline-block mb-3">
                    eListam - SMART POINT OF SALE SYSTEM
                  </span>

                  <h1 className="display-5 fw-bold mb-3 hero-title">
                    <span>Manage Products.</span>{" "}
                    <span className="hero-green">Track Profits.</span>{" "}
                    <span className="text-warning">Grow Smarter.</span>
                  </h1>

                  <p className="text-white-50 fs-5 mb-0 mx-auto hero-description">
                    Inventory management, product listing, and sales tracking —
                    all in one simple place.
                  </p>

                  <div className="hero-divider mx-auto mt-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="row g-4 features-section">
            {/* Step 1 */}
            <div className="col-12 col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 feature-card reveal-on-scroll stagger-1">
                <div className="feature-icon icon-green mb-3">
                  <i className="bi bi-box-seam" aria-hidden="true" />
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
              <div className="card h-100 border-0 shadow-sm p-4 feature-card reveal-on-scroll stagger-2">
                <div className="feature-icon icon-blue mb-3">
                  <i className="bi bi-receipt" aria-hidden="true" />
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
              <div className="card h-100 border-0 shadow-sm p-4 feature-card reveal-on-scroll stagger-3">
                <div className="feature-icon icon-amber mb-3">
                  <i className="bi bi-graph-up-arrow" aria-hidden="true" />
                </div>

                <span className="fw-bold mb-2 text-amber">STEP 03</span>

                <h4 className="fw-bold">Grow Your Business</h4>

                <p className="text-secondary mb-0">
                  Use your sales and profit information to make informed
                  decisions and plan for growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Background>

      {/* Technology Section */}
      <section className="tech-section py-5">
        <div className="container py-4">
          <div className="text-center mb-5 reveal-on-scroll">
            <span className="section-eyebrow">
              BUILT FOR SCALABILITY AND RELIABILITY
            </span>

            <h2 className="display-6 fw-bold mb-3 section-title">
              How eListam Works
            </h2>

            <p className="text-secondary mx-auto section-description">
              Modern technologies working together to power a reliable,
              efficient, and data-driven point-of-sale experience.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="tech-stack-wrapper bg-black text-center text-white mt-5 p-4 p-md-5 shadow-lg reveal-on-scroll">
            <h2 className="fw-bold mb-3">Enterprise-Inspired Solution.</h2>

            <p className="text-white-50 mb-5 mx-auto tech-intro">
              Modern technologies working together to power a reliable,
              efficient, and data-driven point-of-sale experience.
            </p>

            <div className="row justify-content-center g-4">
              {/* React */}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="h-100 p-4 tech-card reveal-on-scroll stagger-1">
                  <div className="tech-logo-wrapper mb-3">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/30/React_Logo_SVG.svg"
                      alt="React logo"
                      className="tech-logo"
                      loading="lazy"
                    />
                  </div>

                  <h4 className="fw-bold mb-2">React.js</h4>

                  <p className="text-white-50 mb-0">
                    Component-based frontend library for building fast,
                    interactive, and reusable user interfaces.
                  </p>
                </div>
              </div>

              {/* .NET Core */}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="h-100 p-4 tech-card reveal-on-scroll stagger-2">
                  <div className="tech-logo-wrapper mb-3">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/e/ee/.NET_Core_Logo.svg"
                      alt=".NET Core logo"
                      className="tech-logo"
                      loading="lazy"
                    />
                  </div>

                  <h4 className="fw-bold mb-2">.NET Core</h4>

                  <p className="text-white-50 mb-0">
                    High-performance, secure, and scalable backend framework for
                    building RESTful APIs.
                  </p>
                </div>
              </div>

              {/* SQL Server */}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="h-100 p-4 tech-card reveal-on-scroll stagger-3">
                  <div className="tech-logo-wrapper sql-logo-wrapper mb-3">
                    <img
                      src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/microsoft-sql-server.svg"
                      alt="Microsoft SQL Server logo"
                      className="tech-logo"
                      loading="lazy"
                    />
                  </div>

                  <h4 className="fw-bold mb-2">Microsoft SQL Server</h4>

                  <p className="text-white-50 mb-0">
                    Reliable relational database with strong data integrity,
                    advanced querying, and enterprise-grade security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
