import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProductCard({ product, handleAddToOrder }) {
  const navigate = useNavigate();
  // const { name, price, image, quantity } = product;
  const location = useLocation();
  // const auth = localStorage.getItem("auth");
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div
      className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-3 col-12 g-4"
      style={{ maxWidth: "400px" }}
    >
      <div className="card bg-primary-subtle p-1 shadow border border-1 border-secondary h-100">
        {/* <div className="card-header bg-success-subtle text-black small fw-medium">
        <span>{name}</span>
      </div> */}
        <div className="card-body d-flex flex-column justify-content-center align-items-center mb-2 bg-white">
          <img
            src={product.image}
            style={{
              height: "200px",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
          />

          <div className="align-self-start">
            <div className="text-black fs-6 fw-medium">
              <span>{product.name}</span>
            </div>
            <div className=" text-black-50 fs-6">
              <span>{product.description.substring(0, 90)}...</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="fs-4 fw-medium text-black">
                ${product.price.toFixed(2)}
              </span>
              <span
                className={`badge bg-warning-subtle border border-warning text-black ms-2`}
              >
                In Stock - {product.quantity}
              </span>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column gap-2">
          <button
            onClick={() => {
              isAuthenticated
                ? handleAddToOrder(product)
                : navigate("/login", { state: { from: location } });
            }}
            className="btn bg-success btn border shadow form-control text-white fw-bold"
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
