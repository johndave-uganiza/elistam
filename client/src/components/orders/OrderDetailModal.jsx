function OrderDetailModal({ onClose, onChange, onUpdate, orderDetail }) {
  const onClickOk =(orderId, orderDetail) => {
    onUpdate(orderId, orderDetail)
  }
  
  return (
    <>
      <div className="modal-backdrop show"></div>
      <div
        className="modal fade show"
        tabIndex="-1"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header bg-secondary-subtle">
              <h1 className="modal-name fs-5">Update Order Qty</h1>
              <button
                onClick={onClose}
                type="button"
                className="btn-close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center gap-2">
                <label className="fw-medium">Quantity:</label>
                <input
                  type="number"
                  className="form-control d-inline"
                  value={orderDetail.quantity}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="modal-footer bg-secondary-subtle">
              <button onClick={onClose} type="button" className="btn btn-dark">
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={() => onClickOk(orderDetail.orderId, orderDetail)}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetailModal;
