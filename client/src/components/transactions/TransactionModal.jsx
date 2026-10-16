import { API_BASE_URL, IMAGE_PLACEHOLDER_URL } from "../../utilities/constants";

function TransactionModal({ selectedTransaction, onClose }) {
  const transactionNumber = selectedTransaction.transactionNumber;

  const orderNo = selectedTransaction.orderNumber;

  const status = selectedTransaction.isCompleted ? "Completed" : "Pending";

  const totalQuantity = Number(selectedTransaction?.totalQuantity) || 0;

  const totalPrice = Number(selectedTransaction?.totalPrice) || 0;

  const transactionDetails = selectedTransaction?.transactionDetails || [];

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleString();
  };

  const getImageUrl = (image) => {
    if (!image) {
      return IMAGE_PLACEHOLDER_URL;
    }

    if (image.startsWith("images")) {
      return `${API_BASE_URL}/${image}`;
    }

    return image;
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-modal-title"
        style={{
          overflowY: "auto",
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          style={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            minHeight: "calc(100vh - 1rem)",
          }}
        >
          <div
            className="modal-content border-0 shadow-lg rounded-4 overflow-hidden"
            style={{
              maxHeight: "calc(100vh - 1rem)",
            }}
          >
            {/* =================================================
                HEADER
            ================================================== */}
            <div className="modal-header bg-dark text-white border-0 px-3 py-2 flex-shrink-0">
              <div className="d-flex align-items-center gap-2 min-w-0">
                <div
                  className="rounded-3 bg-primary d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: "36px",
                    height: "36px",
                  }}
                >
                  <i className="bi bi-receipt"></i>
                </div>

                <div style={{ minWidth: 0 }}>
                  <h6
                    id="transaction-modal-title"
                    className="modal-title fw-semibold mb-0"
                  >
                    Transaction Details
                  </h6>

                  <small className="text-white-50 text-truncate d-block">
                    {transactionNumber}
                  </small>
                </div>
              </div>

              <button
                type="button"
                className="btn-close btn-close-white flex-shrink-0"
                onClick={onClose}
                aria-label="Close"
              />
            </div>

            {/* =================================================
                BODY
            ================================================== */}
            <div
              className="modal-body bg-light px-3 py-2"
              style={{
                overflowY: "auto",
                minHeight: 0,
              }}
            >
              {/* ===============================================
                  TRANSACTION INFORMATION
              ================================================ */}
              <div className="bg-white border rounded-3 p-3 mb-2">
                <div className="row g-3">
                  {/* Transaction Number */}
                  <div className="col-12 col-sm-6 col-md-4">
                    <small className="text-muted d-block">
                      Transaction No.
                    </small>

                    <span className="fw-semibold text-truncate d-block">
                      {transactionNumber}
                    </span>
                  </div>

                  {/* Order Number */}
                  <div className="col-12 col-sm-6 col-md-4">
                    <small className="text-muted d-block">Order No.</small>

                    <span className="fw-semibold text-truncate d-block">
                      {orderNo}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="col-12 col-sm-6 col-md-2">
                    <small className="text-muted d-block">Date</small>

                    <span className="fw-medium d-block">
                      {formatDate(selectedTransaction?.date)}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-12 col-sm-6 col-md-2">
                    <small className="text-muted d-block mb-1">Status</small>

                    <span
                      className={`badge rounded-pill ${
                        selectedTransaction?.isCompleted
                          ? "text-bg-success"
                          : "text-bg-warning"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                </div>
              </div>

              {/* ===============================================
                  ORDER DETAILS
              ================================================ */}
              <div className="bg-white border rounded-3 p-3 mb-2">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <i className="bi bi-cart3 text-primary"></i>

                  <h6 className="fw-semibold mb-0">Order Details</h6>
                </div>

                {transactionDetails.length > 0 ? (
                  <>
                    {/* -----------------------------------------
                          DESKTOP PRODUCT TABLE - VERTICAL SCROLL
                      ------------------------------------------ */}
                    <div
                      className="d-none d-md-block table-responsive"
                      style={{
                        maxHeight: "300px",
                        overflowY: "auto",
                        overflowX: "auto",
                      }}
                    >
                      <table className="table table-hover align-middle mb-0">
                        <thead
                          className="table-light"
                          style={{
                            position: "sticky",
                            top: 0,
                            zIndex: 2,
                          }}
                        >
                          <tr>
                            <th style={{ minWidth: "250px" }}>Product</th>

                            <th
                              className="text-center"
                              style={{ width: "80px" }}
                            >
                              Qty
                            </th>

                            <th className="text-end" style={{ width: "120px" }}>
                              Price
                            </th>

                            <th className="text-end" style={{ width: "130px" }}>
                              Subtotal
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {transactionDetails.map((item, index) => {
                            const quantity = Number(item.quantity) || 0;
                            const price = Number(item.price) || 0;
                            const subtotal = quantity * price;

                            return (
                              <tr key={item.id || index}>
                                <td>
                                  <div className="d-flex align-items-center gap-2">
                                    <img
                                      src={getImageUrl(item.image)}
                                      alt={item.name || "Product"}
                                      onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src =
                                          IMAGE_PLACEHOLDER_URL;
                                      }}
                                      className="rounded-3 border flex-shrink-0"
                                      style={{
                                        width: "50px",
                                        height: "50px",
                                        objectFit: "cover",
                                      }}
                                    />

                                    <div style={{ minWidth: 0 }}>
                                      <div
                                        className="fw-semibold text-truncate"
                                        title={item.name}
                                      >
                                        {item.name || "Unnamed Product"}
                                      </div>

                                      {item.description && (
                                        <small
                                          className="text-muted d-block text-truncate"
                                          style={{ maxWidth: "250px" }}
                                          title={item.description}
                                        >
                                          {item.description}
                                        </small>
                                      )}
                                    </div>
                                  </div>
                                </td>

                                <td className="text-center">
                                  <span className="badge text-bg-light border">
                                    {quantity}
                                  </span>
                                </td>

                                <td className="text-end text-nowrap">
                                  ${price.toFixed(2)}
                                </td>

                                <td className="text-end text-nowrap fw-semibold">
                                  ${subtotal.toFixed(2)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* -----------------------------------------
                        MOBILE PRODUCT CARDS
                    ------------------------------------------ */}
                    <div className="d-md-none">
                      <div className="d-flex flex-column gap-2">
                        {transactionDetails.map((item, index) => {
                          const quantity = Number(item.quantity) || 0;

                          const price = Number(item.price) || 0;

                          const subtotal = quantity * price;

                          return (
                            <div
                              key={item.id || index}
                              className="border rounded-3 p-2 bg-light"
                            >
                              {/* Product */}
                              <div className="d-flex align-items-start gap-2">
                                <img
                                  src={getImageUrl(item.image)}
                                  alt={item.name || "Product"}
                                  onError={(e) => {
                                    e.currentTarget.onerror = null;

                                    e.currentTarget.src = IMAGE_PLACEHOLDER_URL;
                                  }}
                                  className="rounded-3 border bg-white flex-shrink-0"
                                  style={{
                                    width: "52px",
                                    height: "52px",
                                    objectFit: "cover",
                                  }}
                                />

                                <div
                                  className="flex-grow-1"
                                  style={{
                                    minWidth: 0,
                                  }}
                                >
                                  <div
                                    className="fw-semibold text-dark text-truncate"
                                    title={item.name}
                                  >
                                    {item.name || "Unnamed Product"}
                                  </div>

                                  {item.description && (
                                    <small
                                      className="text-muted"
                                      style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                      }}
                                    >
                                      {item.description}
                                    </small>
                                  )}
                                </div>
                              </div>

                              {/* Product Pricing */}
                              <div className="row g-2 mt-1">
                                {/* Quantity */}
                                <div className="col-4">
                                  <div className="bg-white rounded-2 border px-2 py-1">
                                    <small className="text-muted d-block">
                                      Qty
                                    </small>

                                    <span className="fw-semibold">
                                      {quantity}
                                    </span>
                                  </div>
                                </div>

                                {/* Price */}
                                <div className="col-4">
                                  <div className="bg-white rounded-2 border px-2 py-1">
                                    <small className="text-muted d-block">
                                      Price
                                    </small>

                                    <span className="fw-medium text-nowrap">
                                      ${price.toFixed(2)}
                                    </span>
                                  </div>
                                </div>

                                {/* Subtotal */}
                                <div className="col-4">
                                  <div className="bg-white rounded-2 border px-2 py-1">
                                    <small className="text-muted d-block">
                                      Subtotal
                                    </small>

                                    <span className="fw-semibold text-nowrap">
                                      ${subtotal.toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-muted py-4">
                    <i className="bi bi-box-seam fs-3 d-block mb-2"></i>

                    <div>No order details available.</div>
                  </div>
                )}
              </div>

              {/* ===============================================
                  TOTALS
              ================================================ */}
              <div className="bg-white border rounded-3 p-3">
                <div className="row g-3 align-items-center px-2">
                  {/* Total Items */}
                  <div className="col-12 col-sm-6">
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="rounded-3 bg-dark bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: "38px",
                          height: "38px",
                        }}
                      >
                        <i className="bi bi-box text-dark"></i>
                      </div>

                      <div>
                        <small className="text-muted d-block">
                          Total Items
                        </small>

                        <span className="fs-5 fw-bold">{totalQuantity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Total Amount */}
                  <div className="col-12 col-sm-6">
                    <div className="text-sm-end">
                      <small className="text-muted d-block">Total Amount</small>

                      <span className="fs-4 fw-bold text-success">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                FOOTER
            ================================================== */}
            <div className="modal-footer bg-white border-top px-3 py-2 flex-shrink-0">
              <button
                type="button"
                className="btn btn-dark px-3 w-100 w-sm-auto"
                onClick={onClose}
              >
                <i className="bi bi-x-lg me-1"></i>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default TransactionModal;
