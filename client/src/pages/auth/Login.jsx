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
        <div className="row h-100 d-flex justify-content-center align-items-center">
          <div
            className="card bg-transparent p-4 border-1 border-black col-xl-4 col-lg-5 col-md-6 col-sm-7 col-10"
            style={{
              backdropFilter: "blur(8px)",
            }}
          >
            <h3 className="text-center mb-4 text-dark fw-medium">
              eListam - Login
            </h3>
            <form onSubmit={handleLogin}>
              <div className="form-floating mb-4">
                <input
                  type="email"
                  name="email"
                  className="form-control border border-black"
                  id="email"
                  placeholder=""
                  autoComplete="email"
                  required
                  style={{
                    opacity: "0.9",
                    backdropFilter: "blur(2px)",
                  }}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  name="password"
                  className="form-control border border-black"
                  id="password"
                  placeholder=""
                  autoComplete="current-password"
                  required
                  style={{
                    opacity: "0.9",
                    backdropFilter: "blur(12px)",
                  }}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="mt-5">
                <button type="submit" className="btn btn-primary fw-bold w-100">
                  Login
                </button>
              </div>
              {/* <div className="text-center">
            <a href="#">No account? Register here.</a>
          </div> */}
            </form>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default LoginPage;
