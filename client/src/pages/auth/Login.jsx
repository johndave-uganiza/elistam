import { useLocation, useNavigate } from "react-router-dom";
import Background from "../../components/common/Background";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const { login, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from || "/dashboard");
    }
  }, [isAuthenticated, navigate, from]);

  async function handleLogin(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      await login({
        email: formData.get("email"),
        password: formData.get("password"),
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <Background>
      <div className="container">
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">
            <div
              className="card border-0 shadow-lg text-dark"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,.72), rgba(255,255,255,.55))",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                borderRadius: "24px",
                boxShadow: "0 20px 50px rgba(0,0,0,.18)",
              }}
            >
              <div className="card-body p-4">
                {/* Header */}
                <div className="text-center mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "18px",
                      background: "linear-gradient(135deg, #198754, #20c997)",
                      boxShadow: "0 8px 20px rgba(25,135,84,.25)",
                    }}
                  >
                    <i
                      className="bi bi-box-seam text-white"
                      style={{ fontSize: "30px" }}
                    ></i>
                  </div>

                  <h2 className="fw-bold mb-1">Welcome Back!</h2>

                  <p className="text-secondary mb-0">Sign In to eListam</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin}>
                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email Address
                    </label>

                    <div className="input-group">
                      <span
                        className="input-group-text border-end-0"
                        style={{
                          backgroundColor: "rgba(255,255,255,.65)",
                          borderColor: "rgba(0,0,0,.15)",
                        }}
                      >
                        <i className="bi bi-envelope text-secondary"></i>
                      </span>

                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control border-start-0 ps-0"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        style={{
                          backgroundColor: "rgba(255,255,255,.65)",
                          borderColor: "rgba(0,0,0,.15)",
                          boxShadow: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      Password
                    </label>

                    <div className="input-group">
                      <span
                        className="input-group-text border-end-0"
                        style={{
                          backgroundColor: "rgba(255,255,255,.65)",
                          borderColor: "rgba(0,0,0,.15)",
                        }}
                      >
                        <i className="bi bi-lock text-secondary"></i>
                      </span>

                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control border-start-0 ps-0"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                        style={{
                          backgroundColor: "rgba(255,255,255,.65)",
                          borderColor: "rgba(0,0,0,.15)",
                          boxShadow: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Login button */}
                  <button
                    type="submit"
                    className="btn btn-success w-100 fw-bold py-2"
                    style={{
                      borderRadius: "12px",
                      boxShadow: "0 6px 16px rgba(25,135,84,.25)",
                    }}
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Login
                  </button>
                </form>

                {/* Footer */}
                <div className="text-center mt-4">
                  <small className="text-secondary">Demo eListam account</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default LoginPage;
