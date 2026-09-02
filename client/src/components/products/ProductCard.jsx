import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { API_BASE_URL, IMAGE_PLACEHOLDER_URL } from "../../utilities/constants";

function ProductCard({ product, onOrder }) {
  const navigate = useNavigate();
  // const { name, price, image, quantity } = product;
  const location = useLocation();
  // const auth = localStorage.getItem("auth");
  const { isAuthenticated } = useContext(AuthContext);

  // return (
  //   <div
  //     className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-3 col-12 g-4"
  //     style={{ maxWidth: "400px" }}
  //   >
  //     <div className="card bg-primary-subtle p-1 shadow border border-1 border-secondary h-100">
  //       {/* <div className="card-header bg-success-subtle text-black small fw-medium">
  //       <span>{name}</span>
  //     </div> */}
  //       <div className="card-body d-flex flex-column justify-content-center align-items-center mb-2 bg-white">
  //         <img
  //           src={product.image}
  //           style={{
  //             height: "200px",
  //             objectFit: "cover",
  //             transition: "transform 0.3s ease",
  //           }}
  //         />

  //         <div className="align-self-start">
  //           <div className="text-black fs-6 fw-medium">
  //             <span>{product.name}</span>
  //           </div>
  //           <div className=" text-black-50 fs-6">
  //             <span>{product.description.substring(0, 90)}...</span>
  //           </div>
  //           <div className="d-flex align-items-center">
  //             <span className="fs-4 fw-medium text-black">
  //               ${product.price.toFixed(2)}
  //             </span>
  //             <span
  //               className={`badge bg-warning-subtle border border-warning text-black ms-2`}
  //             >
  //               In Stock - {product.quantity}
  //             </span>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="d-flex flex-column gap-2">
  //         <button
  //           onClick={() => {
  //             isAuthenticated
  //               ? handleAddToOrder(product)
  //               : navigate("/login", { state: { from: location } });
  //           }}
  //           className="btn bg-success btn border shadow form-control text-white fw-bold"
  //         >
  //           Add to Order
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div
      className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-3 col-12 g-4"
      style={{ maxWidth: "400px" }}
    >
      <div className="card bg-white p-1 shadow border border-1 border-secondary h-100">
        <img
          src={`${product.image.substring(0, 6) === "images" ? API_BASE_URL.concat("/") : ""}${product.image || IMAGE_PLACEHOLDER_URL}`}
          onError={(e) => {
            e.target.src = IMAGE_PLACEHOLDER_URL;
          }}
          className="align-self-center p-3"
          style={{
            height: "180px",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
        />

        <div className="card-body align-content-end">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-black-50">
            {product.description.substring(0, 50)}...
          </p>
          <p className="card-text d-flex align-items-center gap-4">
            <span>
              Price: <strong>${product.price.toFixed(2)}</strong>
            </span>
            <span
              className={
                "badge bg-warning-subtle border border-warning text-black fw-medium"
              }
            >
              In Stock - <strong>{product.quantity}</strong>
            </span>
          </p>

          <button
            onClick={() => {
              isAuthenticated
                ? onOrder(product)
                : navigate("/login", { state: { from: location } });
            }}
            className="btn btn-success form-control fw-medium"
          >
            <i className="bi bi-bag-plus"></i> Order Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
