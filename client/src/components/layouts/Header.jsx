import { NavLink, Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  return (
    <nav
      className="navbar navbar-expand-md bg-white shadow-sm sticky-top p-3"
      // style={{
      //   background: "linear-gradient(135deg, #0A2540, #1A3A60, #32607F)",
      // }}
      // data-bs-theme="dark"
    >
      <div className="container-fluid px-5">
        <NavLink className="navbar-brand fw-medium" to="/">
          eListam
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse fw-medium`} id="mainNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                <i className="bi bi-shop-window"></i>
                <span className="ms-1">Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                <i className="bi bi-graph-up-arrow"></i>
                <span className="ms-1">Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/items">
                <i className="bi bi-boxes"></i>
                <span className="ms-1">Items</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                <i className="bi bi-ui-checks-grid"></i>
                <span className="ms-1">Products</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/orders">
                <i className="bi bi-bag-check"></i>
                <span className="ms-1">Orders</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/transactions">
                <i className="bi bi-receipt-cutoff"></i>
                <span className="ms-1">Transactions</span>
              </NavLink>
            </li>
          </ul>
          <div className="d-flex gap-2 align-items-center">
            <NavLink className="nav-link fs-5" to="/profile">
              <i className="bi bi-person-circle"></i>
            </NavLink>
            <NavLink
              className="nav-link"
              to="/login"
              // className={`btn btn-${!isAuthenticated ? "warning" : "danger"} border text-black`}

              onClick={() => {
                isAuthenticated && localStorage.removeItem("token");
                setIsAuthenticated(false);
                navigate("/login");
              }}
            >
              {!isAuthenticated ? <span>Login</span> : <span>Logout</span>}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
