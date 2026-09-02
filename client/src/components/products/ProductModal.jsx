import { useContext, useState } from "react";
import { Modal } from "bootstrap";
import { OrderContext } from "../../context/OrderContext";

function ProductModal({ onClose, selectedProduct }) {
  const [itemQuantity, setItemQuantity] = useState(1);
  const { order, setOrder, createOrder } = useContext(OrderContext);

  function handleConfirmAddToOrder(e) {
    e.preventDefault();

    const transactions = JSON.parse(localStorage.getItem("transactions"));

    const id = transactions ? transactions.length + 1 : 1;

    let details;
    if (
      order.details.length > 0 &&
      order.details.some((item) => item.id === selectedProduct.id)
    ) {
      details = order.details.map((item) => {
        if (item.id === selectedProduct.id) {
          return {
            ...item,
            quantity: Number(item.quantity) + Number(itemQuantity),
          };
        }
        return item;
      });
    } else {
      details = [
        ...order.details,
        {
          ...selectedProduct,
          quantity: itemQuantity,
        },
      ];
    }

    const updatedOrder = {
      id: id,
      details: details,
    };

    setOrder(updatedOrder);
    setShowAddToOrderForm(false);
    createOrder(selectedProduct);
    // bsModalRef.current.hide();
  }

  return (
    <>
      <div className="modal-backdrop show"></div>
      <div
        className="modal fade show"
        tabIndex="-1"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <form onSubmit={handleConfirmAddToOrder}>
            <div className="modal-content">
              <div className="modal-header bg-secondary-subtle">
                <h1 className="modal-name fs-5">Product</h1>
                <button
                  onClick={onClose}
                  type="button"
                  className="btn-close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="card shadow border bg-light">
                  <div className="d-flex fs-4">
                    <div className="col-6 text-dark d-flex flex-column align-items-center p-3">
                      <h4 className=" text-center">
                        <strong>{selectedProduct?.name}</strong>
                      </h4>
                      <div className="text-center">
                        <img
                          src={selectedProduct?.image}
                          className="w-75"
                        ></img>
                      </div>
                      <p className="card-text text-black">
                        <small className="text-black">
                          Stock: {selectedProduct?.quantity}
                        </small>
                      </p>
                    </div>
                    <div className="card-body bg-white col-6 p-3 rounded">
                      <h4>Order Details</h4>
                      <hr />
                      <div className="mb-3">
                        {/* <strong>Product Name:</strong> */}
                        <p className="card-text mb-0 small">
                          {selectedProduct?.name}
                        </p>
                      </div>

                      <div className="d-flex flex-column mb-4 w-75">
                        <p className="small">
                          Price: ${selectedProduct?.price}
                        </p>
                        <p className="small">Quantity: {itemQuantity}</p>
                        <div className="input-group mb-3">
                          <button
                            onClick={() => {
                              setItemQuantity((prev) =>
                                prev > 1 ? prev - 1 : prev,
                              );
                            }}
                            className="btn btn-sm btn-success"
                            type="button"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="form-control form-control-sm text-center"
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
                            className="btn btn-sm btn-success"
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
                            {(itemQuantity * selectedProduct?.price).toFixed(2)}
                          </strong>
                        </p>
                      </div>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer bg-secondary-subtle">
                <button
                  onClick={onClose}
                  type="button"
                  className="btn btn-dark"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Order
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProductModal;
