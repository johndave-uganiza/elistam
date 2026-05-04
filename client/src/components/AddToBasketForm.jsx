import { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import { ProductsContext } from "../context/ProductsContext";
import { BasketContext } from "../context/BasketContext";

function AddToBasketForm({
  showAddToBasketForm,
  setShowAddToBasketForm,
  currentProductItem,
}) {
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);

  useEffect(() => {
    if (!modalRef.current) return;

    if (!bsModalRef.current) {
      bsModalRef.current = new Modal(modalRef.current, { backdrop: "static" });
    }

    if (showAddToBasketForm) {
      bsModalRef.current.show();
    } else {
      bsModalRef.current.hide();
    }
  }, [showAddToBasketForm, setShowAddToBasketForm]);

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
  //       title: name,
  //       price: price,
  //       quantity: quantity,
  //       expirationDate: expirationDate,
  //     },
  //   ]);

  //   bsModalRef.current.hide();
  //   setShowAddToBasketForm(false);
  // }

  // const location = useLocation();
  // const navigate = useNavigate();
  const [itemQuantity, setItemQuantity] = useState(1);
  const { basketItems, setBasketItems } = useContext(BasketContext);

  function handleAddToBasket(e) {
    e.preventDefault();
    const productItemWithQuantity = {
      ...location.state.productItem,
      quantity: itemQuantity,
    };

    const newBasketItems = [...basketItems, productItemWithQuantity];

    setBasketItems(newBasketItems);
    localStorage.setItem("basket", JSON.stringify(newBasketItems));

    // navigate("/basket");
  }

  return (
    <div ref={modalRef} className="modal fade" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Add To Basket
            </h1>
            <button
              onClick={() => {
                bsModalRef.current.hide();
                setShowAddToBasketForm(false);
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
                    <strong>{currentProductItem?.title}</strong>
                  </h4>
                  <div className="text-center">
                    <img
                      src={currentProductItem?.thumbnail}
                      className="w-75"
                    ></img>
                  </div>
                  <p className="card-text text-black">
                    <small className="text-black">
                      Stock: {currentProductItem?.stock}
                    </small>
                  </p>
                </div>
                <div className="card-body bg-primary col-6 p-3 rounded">
                  <h4>Order Summary</h4>
                  <hr />
                  <form onSubmit={handleAddToBasket}>
                    <div className="mb-3">
                      {/* <strong>Product Name:</strong> */}
                      <p className="card-text mb-0 small">
                        {currentProductItem?.title}
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          Category: {currentProductItem?.category}
                        </small>
                      </p>
                    </div>

                    <div className="d-flex flex-column mb-4 col-lg-12 col-md-5 col-8">
                      <p className="small">Quantity: {itemQuantity}</p>
                      <p className="small">
                        Price: ${currentProductItem?.price}
                      </p>
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
                          $
                          {(itemQuantity * currentProductItem?.price).toFixed(
                            2,
                          )}
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
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                bsModalRef.current.hide();
                setShowAddToBasketForm(false);
              }}
              type="button"
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              form="addProductForm"
              type="submit"
              className="btn btn-primary"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToBasketForm;
