function ProductModal({
  onClose,
  selectedProduct,
  onSubmit,
  orderDetail,
  onClickOrderQty,
  onChangeOrderQty,
}) {
  const quantity = Number(orderDetail?.quantity) || 0;
  const price = Number(selectedProduct?.price) || 0;
  const total = quantity * price;
  const stock = Number(selectedProduct?.quantity) || 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (quantity <= 0) {
      return;
    }

    onSubmit(orderDetail);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show" />

      <div
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{
          display: "block",
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          style={{
            maxWidth: "900px",
            width: "calc(100% - 1rem)",

            margin: "0.5rem auto",
          }}
        >
          <div
            className="modal-content border-0 shadow-lg rounded-4 overflow-hidden h-100"
            style={{
              maxHeight: "100%",
            }}
          >
            <form onSubmit={handleSubmit} className="d-flex flex-column h-100">
              {/* Header */}
              <div className="modal-header bg-dark text-white border-0 px-3 py-2 flex-shrink-0">
                <div className="d-flex align-items-center gap-2 min-w-0">
                  <div
                    className="rounded-3 bg-primary d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: "36px",
                      height: "36px",
                    }}
                  >
                    <i className="bi bi-cart-plus" />
                  </div>

                  <div className="text-truncate">
                    <h5 className="modal-title fw-semibold mb-0">
                      Add to Order
                    </h5>

                    <small className="text-white-50 d-none d-sm-block">
                      Select the quantity you'd like to order
                    </small>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  type="button"
                  className="btn-close btn-close-white flex-shrink-0"
                  aria-label="Close"
                />
              </div>

              {/* Body */}
              <div
                className="modal-body bg-light p-2 p-sm-3 p-md-4 flex-grow-1"
                style={{
                  minHeight: 0,
                  overflowY: "auto",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <div className="row g-2 g-md-3">
                  {/* Product Preview */}
                  <div className="col-12 col-md-5">
                    <div className="bg-white border rounded-4 p-2 p-sm-3 h-100">
                      {/* Image */}
                      <div
                        className="bg-light rounded-3 d-flex align-items-center justify-content-center overflow-hidden mb-2 mb-md-3"
                        style={{
                          height: "clamp(90px, 18vw, 210px)",
                        }}
                      >
                        {selectedProduct?.image ? (
                          <img
                            src={selectedProduct.image}
                            alt={selectedProduct?.name || "Product"}
                            className="img-fluid"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <i
                            className="bi bi-image text-secondary"
                            style={{
                              fontSize: "clamp(2rem, 7vw, 4rem)",
                            }}
                          />
                        )}
                      </div>

                      {/* Product Name */}
                      <h5 className="fw-semibold text-dark mb-1 fs-6">
                        {selectedProduct?.name || "Product"}
                      </h5>

                      {/* Description */}
                      {selectedProduct?.description && (
                        <p
                          className="text-muted small mb-2"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {selectedProduct.description}
                        </p>
                      )}

                      {/* Product Meta */}
                      <div className="d-flex justify-content-between align-items-center border-top pt-2">
                        <div>
                          <small className="text-muted d-block">Price</small>

                          <span className="fs-5 fw-bold text-primary">
                            ${price.toFixed(2)}
                          </span>
                        </div>

                        <div className="text-end">
                          <small className="text-muted d-block">
                            Available
                          </small>

                          <span
                            className={`badge rounded-pill ${
                              stock > 0 ? "text-bg-success" : "text-bg-danger"
                            }`}
                          >
                            {stock} in stock
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="col-12 col-md-7">
                    <div className="bg-white border rounded-4 p-2 p-sm-3 p-md-4 h-100">
                      {/* Title */}
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <i className="bi bi-bag-check text-primary" />

                        <div>
                          <h6 className="fw-semibold mb-0">Order details</h6>

                          <small className="text-muted">
                            Choose your quantity
                          </small>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                        <span className="text-muted">Unit price</span>

                        <span className="fw-semibold">${price.toFixed(2)}</span>
                      </div>

                      {/* Quantity */}
                      <div className="py-2 border-bottom">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="text-muted">Quantity</span>

                          <small className="text-muted">Max: {stock}</small>
                        </div>

                        <div className="d-flex align-items-center justify-content-center">
                          <button
                            onClick={() => onClickOrderQty(-1)}
                            className="btn btn-outline-secondary d-flex align-items-center justify-content-center flex-shrink-0"
                            type="button"
                            disabled={quantity <= 0}
                            style={{
                              width: "40px",
                              height: "40px",
                            }}
                          >
                            <i className="bi bi-dash-lg" />
                          </button>

                          <input
                            type="number"
                            min="0"
                            max={stock}
                            className="form-control text-center fw-semibold mx-2"
                            style={{
                              height: "40px",
                              width: "80px",
                            }}
                            onChange={onChangeOrderQty}
                            value={quantity}
                          />

                          <button
                            onClick={() => onClickOrderQty(1)}
                            className="btn btn-outline-secondary d-flex align-items-center justify-content-center flex-shrink-0"
                            type="button"
                            disabled={quantity >= stock || stock <= 0}
                            style={{
                              width: "40px",
                              height: "40px",
                            }}
                          >
                            <i className="bi bi-plus-lg" />
                          </button>
                        </div>

                        {stock <= 0 && (
                          <small className="text-danger d-block mt-2">
                            <i className="bi bi-exclamation-circle me-1" />
                            This product is out of stock.
                          </small>
                        )}
                      </div>

                      {/* Summary */}
                      <div className="pt-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-muted">
                            {quantity} {quantity === 1 ? "item" : "items"}
                          </span>

                          <span className="text-muted">Subtotal</span>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-1">
                          <span className="fw-semibold">Total</span>

                          <span
                            className="fw-bold text-primary"
                            style={{
                              fontSize: "clamp(1.5rem, 6vw, 2rem)",
                            }}
                          >
                            ${total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer bg-white border-top px-2 py-2 flex-shrink-0">
                <div className="d-flex w-100 gap-2">
                  <button
                    onClick={onClose}
                    type="button"
                    className="btn btn-light border flex-fill"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary flex-fill"
                    disabled={quantity <= 0 || stock <= 0}
                  >
                    <i className="bi bi-cart-plus me-2" />
                    Add to Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductModal;
