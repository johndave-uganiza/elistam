function OrderDetailModal({ onClose, onChange, onUpdate, orderDetail }) {
  const onClickOk = () => {
    onUpdate(orderDetail.orderId, orderDetail);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal */}
      <div
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
            {/* Header */}
            <div className="modal-header bg-dark text-white border-0 px-4 py-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3 bg-primary"
                  style={{
                    width: "42px",
                    height: "42px",
                    flexShrink: 0,
                  }}
                >
                  <i className="bi bi-cart-check fs-5" aria-hidden="true"></i>
                </div>

                <div>
                  <h5 className="modal-title fs-6 fw-semibold mb-1">
                    Update Quantity
                  </h5>

                  <small className="text-white-50">
                    Adjust your order item
                  </small>
                </div>
              </div>

              <button
                onClick={onClose}
                type="button"
                className="btn-close btn-close-white ms-2"
                aria-label="Close"
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body p-4">
              <div className="mb-3">
                <label
                  htmlFor="orderQuantity"
                  className="form-label fw-semibold text-dark mb-2"
                >
                  Quantity
                </label>

                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-light border-end-0">
                    <i
                      className="bi bi-box-seam text-secondary"
                      aria-hidden="true"
                    ></i>
                  </span>

                  <input
                    id="orderQuantity"
                    name="quantity"
                    type="number"
                    min="1"
                    step="1"
                    className="form-control bg-light border-start-0 ps-2 fw-semibold"
                    value={orderDetail.quantity}
                    onChange={onChange}
                    required
                    aria-describedby="quantityHelp"
                  />
                </div>

                <small id="quantityHelp" className="text-muted d-block mt-2">
                  Enter the number of items to order.
                </small>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer border-top bg-light px-4 py-3">
              <button
                onClick={onClose}
                type="button"
                className="btn btn-outline-secondary px-3"
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-primary px-3 fw-medium"
                onClick={onClickOk}
                disabled={
                  !Number.isInteger(Number(orderDetail.quantity)) ||
                  Number(orderDetail.quantity) < 1
                }
              >
                <i className="bi bi-check2 me-1"></i>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetailModal;
