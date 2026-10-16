import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../assets/css/layouts/header.css";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-3 ${
      isActive ? "active" : ""
    }`;

  return (
    <nav className="navbar navbar-expand-md bg-white border-bottom sticky-top py-2">
      <div className="container-fluid px-3 px-lg-4 header-container">
        {/* Top Header Row */}
        <div className="header-top-row">
          {/* Brand */}
          <NavLink
            className="navbar-brand d-flex align-items-center gap-2 fw-bold mb-0"
            to="/"
          >
            <span className="text-white bg-dark p-2 px-3">eListam</span>
          </NavLink>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler border-0 shadow-none p-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list fs-3"></i>
          </button>
        </div>

        {/* Mobile Quick Navigation */}
        <div className="mobile-quick-nav d-md-none">
          {isAuthenticated && (
            <NavLink to="/dashboard" className={navLinkClass}>
              <i className="bi bi-grid-1x2-fill"></i>
              <span>Dashboard</span>
            </NavLink>
          )}

          {isAuthenticated && (
            <NavLink to="/items" className={navLinkClass}>
              <i className="bi bi-box-seam"></i>
              <span>Items</span>
            </NavLink>
          )}

          <NavLink to="/products" className={navLinkClass}>
            <i className="bi bi-ui-checks-grid"></i>
            <span>Products</span>
          </NavLink>

          {isAuthenticated && (
            <NavLink to="/transactions" className={navLinkClass}>
              <i className="bi bi-receipt"></i>
              <span>Transactions</span>
            </NavLink>
          )}
        </div>

        {/* Collapsible Navigation */}
        <div className="collapse navbar-collapse" id="mainNav">
          {/* Main Navigation - Desktop */}
          <ul className="navbar-nav me-auto gap-md-1 mt-3 mt-md-0">
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink className={navLinkClass} to="/dashboard">
                    <i className="bi bi-grid-1x2-fill"></i>
                    <span>Dashboard</span>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className={navLinkClass} to="/items">
                    <i className="bi bi-box-seam"></i>
                    <span>Items</span>
                  </NavLink>
                </li>
              </>
            )}

            <li className="nav-item">
              <NavLink className={navLinkClass} to="/products">
                <i className="bi bi-ui-checks-grid"></i>
                <span>Products</span>
              </NavLink>
            </li>

            {isAuthenticated && (
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/transactions">
                  <i className="bi bi-receipt"></i>
                  <span>Transactions</span>
                </NavLink>
              </li>
            )}

            {/* Mobile Secondary Links */}
            <div className="d-md-none">
              <hr className="my-2" />

              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <NavLink className={navLinkClass} to="/orders">
                      <i className="bi bi-bag-check"></i>
                      <span>My Orders</span>
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className={navLinkClass} to="/settings">
                      <i className="bi bi-gear"></i>
                      <span>Settings</span>
                    </NavLink>
                  </li>

                  <hr className="my-2" />

                  <li className="nav-item">
                    <button
                      type="button"
                      className="nav-link text-danger border-0 bg-transparent w-100 text-start d-flex align-items-center gap-2 px-3 py-2 rounded-3"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Logout</span>
                    </button>
                  </li>
                </>
              )}

              {!isAuthenticated && (
                <li className="nav-item mt-2">
                  <button
                    type="button"
                    className="btn btn-success w-100 rounded-3"
                    onClick={() => navigate("/login")}
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Login
                  </button>
                </li>
              )}
            </div>
          </ul>

          {/* Desktop User Menu */}
          <div className="d-none d-md-flex align-items-center">
            {isAuthenticated ? (
              <div className="dropdown">
                <button
                  className="btn d-flex align-items-center gap-2 border-0 bg-light rounded-pill px-3 py-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span
                    className="d-flex align-items-center justify-content-center bg-dark text-white rounded-circle"
                    style={{
                      width: "32px",
                      height: "32px",
                      fontSize: "14px",
                    }}
                  >
                    A
                  </span>

                  <span className="fw-semibold">Admin</span>

                  <i className="bi bi-chevron-down small text-secondary"></i>
                </button>

                <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-4 mt-2 p-2">
                  <li>
                    <NavLink
                      className="dropdown-item rounded-3 py-2 d-flex align-items-center gap-2"
                      to="/orders"
                    >
                      <i className="bi bi-bag-check"></i>
                      <span>My Orders</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="dropdown-item rounded-3 py-2 d-flex align-items-center gap-2"
                      to="/settings"
                    >
                      <i className="bi bi-gear"></i>
                      <span>Settings</span>
                    </NavLink>
                  </li>

                  <li>
                    <hr className="dropdown-divider my-2" />
                  </li>

                  <li>
                    <button
                      type="button"
                      className="dropdown-item rounded-3 py-2 d-flex align-items-center gap-2 text-danger"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                type="button"
                className="btn bg-success-subtle rounded-pill px-4 fw-semibold"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
