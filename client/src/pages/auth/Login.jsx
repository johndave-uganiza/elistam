function LoginPage() {
  function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
  }

  return (
    <div className="d-flex align-items-center justify-content-center flex-fill bg-secondary">
      <div className="card p-4" style={{ minWidth: "320px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="form-floating mb-4">
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder=""
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
  );
}

export default LoginPage;
