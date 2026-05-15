import { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import { ProductContext } from "../../context/ProductContext";
import { OrderContext } from "../../context/OrderContext";

function AddToOrderForm({
  showAddToOrderForm,
  setShowAddToOrderForm,
  currentProduct,
}) {
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);

  useEffect(() => {
    if (!modalRef.current) return;

    if (!bsModalRef.current) {
      bsModalRef.current = new Modal(modalRef.current, { backdrop: "static" });
    }

    if (showAddToOrderForm) {
      bsModalRef.current.show();
    } else {
      bsModalRef.current.hide();
    }
  }, [showAddToOrderForm, setShowAddToOrderForm]);

  // function handleAddProduct(e) {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const name = formData.get("name");
  //   const price = formData.get("price");
  //   const quantity = formData.get("quantity");
  //   const expirationDate = new Date(
  //     formData.get("expirationDate"),
  //   ).toLocaleDateString("en-US");

  //   setProducts([
  //     ...products,
  //     {
  //       name: name,
  //       price: price,
  //       quantity: quantity,
  //       expirationDate: expirationDate,
  //     },
  //   ]);

  //   bsModalRef.current.hide();
  //   setShowAddToOrderForm(false);
  // }

  // const location = useLocation();
  // const navigate = useNavigate();
  const [itemQuantity, setItemQuantity] = useState(1);
  const { order, setOrder } = useContext(OrderContext);

  function handleAddToBasket(e) {
    e.preventDefault();
    const newOrder = {
      ...currentProduct,
      quantity: itemQuantity,
    };

    const newBasketItems = [...order, newOrder];

    setOrder(newBasketItems);
    localStorage.setItem("order", JSON.stringify(newBasketItems));
    bsModalRef.current.hide();
    // navigate("/orders");
  }

  return (
    <div ref={modalRef} className="modal fade" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <form onSubmit={handleAddToBasket}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-name fs-5" id="staticBackdropLabel">
                Add To Order
              </h1>
              <button
                onClick={() => {
                  bsModalRef.current.hide();
                  setShowAddToOrderForm(false);
                }}
                type="button"
                className="btn-close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="card shadow border bg-primary-subtle">
                <div className="d-flex">
                  <div className="col-6 text-dark d-flex flex-column align-items-center p-3">
                    <h4 className=" text-center">
                      <strong>{currentProduct?.name}</strong>
                    </h4>
                    <div className="text-center">
                      <img src={currentProduct?.image} className="w-75"></img>
                    </div>
                    <p className="card-text text-black">
                      <small className="text-black">
                        Stock: {currentProduct?.quantity}
                      </small>
                    </p>
                  </div>
                  <div className="card-body bg-primary col-6 p-3 rounded">
                    <h4>Order Details</h4>
                    <hr />
                    <div className="mb-3">
                      {/* <strong>Product Name:</strong> */}
                      <p className="card-text mb-0 small">
                        {currentProduct?.name}
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          Category: {currentProduct?.category}
                        </small>
                      </p>
                    </div>

                    <div className="d-flex flex-column mb-4 col-lg-12 col-md-5 col-8">
                      <p className="small">Quantity: {itemQuantity}</p>
                      <p className="small">Price: ${currentProduct?.price}</p>
                      <div className="input-group mb-3">
                        <button
                          onClick={() => {
                            setItemQuantity((prev) =>
                              prev > 1 ? prev - 1 : prev,
                            );
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
                        Total:{" "}
                        <strong>
                          ${(itemQuantity * currentProduct?.price).toFixed(2)}
                        </strong>
                      </p>
                    </div>
                    <hr />
                    {/* <div className="d-flex gap-2">
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
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => {
                  bsModalRef.current.hide();
                  setShowAddToOrderForm(false);
                }}
                type="button"
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                // form="addProductForm"
                type="submit"
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddToOrderForm;
