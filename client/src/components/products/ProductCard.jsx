import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { API_BASE_URL, IMAGE_PLACEHOLDER_URL } from "../../utilities/constants";

function ProductCard({ product, onOrderProduct }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  const imageUrl =
    product.image?.substring(0, 6) === "images"
      ? API_BASE_URL.concat("/", product.image)
      : product.image || IMAGE_PLACEHOLDER_URL;

  return (
    <div className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
      <div className="card bg-white shadow-sm h-100 rounded-2 overflow-hidden">
        {/* Product Image */}
        <div
          className="d-flex align-items-center justify-content-center bg-light position-relative"
          style={{
            height: "clamp(110px, 25vw, 180px)",
          }}
        >
          <img
            src={imageUrl}
            onError={(e) => {
              e.currentTarget.src = IMAGE_PLACEHOLDER_URL;
            }}
            alt={product.name}
            className="img-fluid"
            style={{
              height: "100%",
              width: "100%",
              padding: "10px",
              objectFit: "contain",
            }}
          />

          <span
            className="position-absolute badge bg-warning-subtle rounded-pill fw-medium text-nowrap text-black border border-warning"
            style={{
              top: "6px",
              right: "6px",
              fontSize: "clamp(0.55rem, 1.8vw, 0.75rem)",
              padding: "0.3rem 0.5rem",
            }}
          >
            In Stock
          </span>
        </div>

        {/* Product Details */}
        <div className="card-body d-flex flex-column gap-2 p-2 p-sm-3">
          {/* Name & Description */}
          <div>
            <h5
              className="card-title mb-1 text-truncate"
              title={product.name}
              style={{
                fontSize: "clamp(0.85rem, 2.5vw, 1.25rem)",
              }}
            >
              {product.name}
            </h5>

            <p
              className="card-text text-black-50 mb-0"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "2.5rem",
                fontSize: "clamp(0.7rem, 2vw, 0.9rem)",
              }}
            >
              {product.description}
            </p>
          </div>

          <hr className="p-0 m-0" />

          {/* Price & Stock */}
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-2">
              {/* Price */}
              <div
                className="text-nowrap"
                style={{
                  fontSize: "clamp(0.75rem, 2.2vw, 1rem)",
                }}
              >
                <span className="text-muted d-none d-sm-inline">Price: </span>

                <span className="text-muted d-inline d-sm-none">$</span>

                <strong className="text-dark">
                  {Number(product.price ?? 0).toFixed(2)}
                </strong>
              </div>

              {/* Stock */}
              <span
                className="badge bg-primary-subtle rounded-pill fw-medium text-black text-nowrap"
                style={{
                  fontSize: "clamp(0.6rem, 1.8vw, 0.75rem)",
                  padding: "0.3rem 0.5rem",
                  maxWidth: "55%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <span className="d-none d-sm-inline">Available - </span>
                <span className="d-inline d-sm-none">Avail. </span>
                <strong>{product.stock}</strong>
              </span>
            </div>

            {/* Order Button */}
            <button
              type="button"
              onClick={() => {
                isAuthenticated
                  ? onOrderProduct(product)
                  : navigate("/login", {
                      state: { from: location },
                    });
              }}
              className="btn btn-success w-100 fw-medium"
              style={{
                fontSize: "clamp(0.7rem, 2vw, 0.9rem)",
                padding: "0.4rem 0.5rem",
              }}
            >
              <i className="bi bi-bag-plus me-1"></i>
              <span className="d-none d-sm-inline">Order Product</span>
              <span className="d-inline d-sm-none">Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
