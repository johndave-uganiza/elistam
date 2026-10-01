import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-md bg-white shadow-sm sticky-top px-3">
      <div className="container-fluid">
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
          <ul className="navbar-nav me-auto gap-2">
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
              <NavLink className="nav-link" to="/transactions">
                <i className="bi bi-receipt-cutoff"></i>
                <span className="ms-1">Transactions</span>
              </NavLink>
            </li>
            <hr className=" d-md-inline-block m-0 p-0"></hr>
            <div className=" d-md-none">
              <li className="nav-item">
                <NavLink className="nav-link" to="/transactions">
                  <i className="bi bi-bag-check-fill"></i>
                  <span className="ms-1">My Orders</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/transactions">
                  <i className="bi bi-gear"></i>
                  <span className="ms-1">Settings</span>
                </NavLink>
              </li>
              <hr className=" d-md-inline-block m-0 p-1"></hr>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-danger"
                  to="/login"
                  onClick={() => {
                    isAuthenticated && localStorage.removeItem("token");
                    setIsAuthenticated(false);
                    navigate("/login");
                  }}
                >
                  <i className="bi bi-box-arrow-left"></i>
                  <span className="ms-1">Logout</span>
                </NavLink>
              </li>
            </div>
          </ul>
          <div className="d-flex gap-2 align-items-center d-none d-md-block">
            {isAuthenticated ? (
              <NavLink className="nav-link">
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <span
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      // aria-expanded="false"
                    >
                      <span className="me-2">Hi, Admin</span>
                      <i className="bi bi-person-circle"></i>
                    </span>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <span className="dropdown-item">
                          <i className="bi bi-bag-check-fill"></i>
                          <span className="ms-2">My Orders</span>
                        </span>
                      </li>
                      <li>
                        <span className="dropdown-item">
                          <i className="bi bi-gear"></i>
                          <span className="ms-2">Settings</span>
                        </span>
                      </li>
                      <hr className="mx-2 my-0 pt-2" />
                      <li>
                        <span
                          className="dropdown-item text-danger"
                          to="/login"
                          onClick={() => {
                            isAuthenticated && localStorage.removeItem("token");
                            setIsAuthenticated(false);
                            navigate("/login");
                          }}
                        >
                          <i className="bi bi-box-arrow-left"></i>
                          <span className="ms-2">Logout</span>
                        </span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </NavLink>
            ) : (
              <button className={`btn btn-dark fw-medium`}>Login</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
