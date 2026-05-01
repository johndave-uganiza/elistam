import { useState } from "react";
import { NavLink, Link, Navigate, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);

  function toggleNavigation() {
    setCollapse(!collapse);
  }
  return (
    <nav
      className="navbar navbar-expand-md bg-primary show"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          eListam
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavigation}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${collapse ? "show" : ""}`}>
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
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
