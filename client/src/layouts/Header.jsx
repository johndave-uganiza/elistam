import { NavLink, Link, Navigate, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-md bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          eListam
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/basket">
                Basket
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/transactions">
                Transactions
              </NavLink>
            </li>
          </ul>
          <div>
            <button
              className="btn btn-warning border text-black"
              onClick={() => navigate("/login")}
            >
              Login
              {/* <a
                className="text-black fw-bold text-decoration-none"
                to="/login"
              >
                Login
              </a> */}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
