function Register() {
  return (
    <div className="d-flex align-items-center justify-content-center flex-fill bg-secondary">
      <div className="card p-4" style={{ width: "350px" }}>
        <div className="text-center h1">Register</div>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-success w-100">
              Register
            </button>
          </div>
          <div className="text-center">
            <a href="#">Have an account? Login here.</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
