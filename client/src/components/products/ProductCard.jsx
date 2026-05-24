import { useLocation, useNavigate } from "react-router-dom";
function ProductCard({ product, handleAddToOrder }) {
  const navigate = useNavigate();
  const { name, price, image, quantity } = product;
  const location = useLocation();
  const auth = localStorage.getItem("auth");
  return (
    <div className="col-xl-2 col-lg-3 col-md-3 col-sm-5 col-12 card bg-primary-subtle p-1 shadow border border-2 border-primary">
      <div className="card-header bg-primary text-white small fw-medium">
        <span>{name}</span>
      </div>
      <div className="card-body d-flex flex-column gap-3 justify-content-center align-items-center mb-2 bg-white">
        <img className="w-50" src={image} alt="" />

        <div className="align-self-start">
          <div className="d-flex align-items-center">
            <span className="fs-6 text-black">${price}</span>
            <span
              className={`badge bg-${quantity > 10 ? "success" : "warning"} text-white ms-2`}
            >
              In Stock - {quantity}
            </span>
          </div>
          <div className="text-black fs-6 fw-bold">
            <span>{name}</span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column gap-2">
        <button
          onClick={() => {
            auth
              ? handleAddToOrder(product)
              : navigate("/login", { state: { from: location } });
          }}
          className="btn btn-success btn border shadow form-control text-white fw-bold"
        >
          Add to Order
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
