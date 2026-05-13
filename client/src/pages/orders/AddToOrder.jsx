import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderContext } from "../../context/OrderContext";

function AddToBasket() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, price, thumbnail, category, stock } =
    location.state.productItem;
  const [itemQuantity, setItemQuantity] = useState(1);
  const { orders, setOrders } = useContext(OrderContext);
  function handlePlaceToBasket(e) {
    e.preventDefault();
    const productItemWithQuantity = {
      ...location.state.productItem,
      quantity: itemQuantity,
    };

    const newBasketItems = [...orders, productItemWithQuantity];

    setOrders(newBasketItems);
    localStorage.setItem("order", JSON.stringify(newBasketItems));

    navigate("/order");
  }

  return (
    <div className="d-flex align-items-center justify-content-center flex-grow-1">
      <div className="card shadow border m-3 bg-primary-subtle">
        <div className="row border ">
          <div className="col-6 text-dark d-flex flex-column align-items-center p-3">
            <h4 className=" text-center">
              <strong>{title}</strong>
            </h4>
            <div>
              <img src={thumbnail}></img>
            </div>
            <p className="card-text text-black">
              <small className="text-black">Stock: {stock}</small>
            </p>
          </div>
          <div className="card-body bg-primary col-6 p-3">
            <h4>Order Summary</h4>
            <hr />
            <form onSubmit={handlePlaceToBasket}>
              <div className="mb-3">
                {/* <strong>Product Name:</strong> */}
                <p className="card-text mb-0">{title}</p>
                <p className="card-text">
                  <small className="text-body-secondary">
                    Category: {category}
                  </small>
                </p>
              </div>

              <div className="d-flex flex-column gap-2 mb-4 col-lg-6 col-md-5 col-8">
                <p>Quantity:</p>
                <div className="input-group mb-3">
                  <button
                    onClick={() => {
                      setItemQuantity((prev) => (prev > 1 ? prev - 1 : prev));
                    }}
                    className="btn btn-warning"
                    type="button"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control text-center"
                    onChange={(e) => setItemQuantity(e.target.value)}
                    value={itemQuantity}
                    onBlur={() => {
                      if (!itemQuantity || itemQuantity < 1) {
                        setItemQuantity(1);
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      setItemQuantity((prev) => prev + 1);
                    }}
                    className="btn btn-warning"
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>
              <hr />
              <div className="mb-3">
                <p className="card-text">
                  Total: <strong>${(itemQuantity * price).toFixed(2)}</strong>
                </p>
              </div>
              <hr />
              <div className="d-flex gap-2">
                <button
                  onClick={() => navigate(-1)}
                  type="submit"
                  className="btn btn-info fw-medium rounded-5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success fw-medium rounded-5"
                >
                  Place To Basket
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToBasket;
