import { useLocation, useNavigate } from "react-router-dom";
import Background from "../../components/common/Background";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const admin = {
      email: "admin@test.com",
      password: "Admin123",
    };

    if (email === admin.email && password === admin.password) {
      localStorage.setItem("auth", true);
    }

    const auth = localStorage.getItem("auth");
    if (auth) {
      navigate(from);
    }
  }

  return (
    <Background>
      <div
        className="container d-flex justify-content-center"
        style={{ marginTop: "10%" }}
      >
        <div className="card p-4 bg-transparent border-1 border-black col-xl-4 col-lg-5 col-md-6 col-sm-7 col-10">
          <h3 className="text-center mb-4 text-dark fw-bold">
            eListam - Login
          </h3>
          <form onSubmit={handleLogin}>
            <div className="form-floating mb-4">
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder=""
                autoComplete="email"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder=""
                autoComplete="current-password"
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="mt-5">
              <button type="submit" className="btn btn-success fw-bold w-100">
                Login
              </button>
            </div>
            {/* <div className="text-center">
            <a href="#">No account? Register here.</a>
          </div> */}
          </form>
        </div>
      </div>
    </Background>
  );
}

export default LoginPage;
