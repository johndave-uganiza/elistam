import { useContext, useState } from "react";
import { Modal } from "bootstrap";
import { OrderContext } from "../../context/OrderContext";

function ProductModal({
  onClose,
  selectedProduct,
  onSubmit,
  order,
  onClickOrderQty,
  onChangeOrderQty,
}) {
  const { orderDetail } = order;
  const handleSubmit = () => {
    onSubmit(order);
  };

  return (
    <>
      <div className="modal-backdrop show"></div>
      <div
        className="modal fade show"
        tabIndex="-1"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <form onSubmit={handleSubmit}>
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
                        <h5>{selectedProduct?.name}</h5>
                      </div>

                      <div className="d-flex flex-column mb-4">
                        <p className="fs-5">Price: ${selectedProduct?.price}</p>
                        <p className="fs-5">
                          Order Quantity: {orderDetail.quantity}
                        </p>
                        <div className="input-group mb-3">
                          <button
                            onClick={() => onClickOrderQty(-1)}
                            className="btn btn-dark fw-bold"
                            type="button"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="form-control form-control-sm text-center"
                            style={{ maxWidth: "80px" }}
                            onChange={onChangeOrderQty}
                            value={orderDetail.quantity}
                            // onBlur={() => {
                            //   if (!order.quantity || order.quantity < 1) {
                            //     setQuantity(1);
                            //   }
                            // }}
                          />
                          <button
                            onClick={() => onClickOrderQty(1)}
                            className="btn btn-dark fw-bold"
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
                            {(
                              orderDetail.quantity * selectedProduct?.price
                            ).toFixed(2)}
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
