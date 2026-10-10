import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import OrderTable from "./OrderTable";
import Swal from "sweetalert2";
import { PAYMENT_METHODS } from "../../utilities/constants";

function OrderModal({ onClose }) {
  const { getOrder, confirmOrder, isLoading } = useContext(OrderContext);

  const [order, setOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getOrder();

      if (result?.data) {
        const { id, date, totalPrice, orderDetails } = result.data;

        setOrder({
          id,
          date,
          totalPrice,
          orderDetails:
            orderDetails?.map((detail) => ({
              id: detail.id,
              orderId: id,
              productId: detail.productId,
              name: detail.name,
              description: detail.description,
              price: detail.price,
              quantity: detail.quantity,
              image: detail.image,
            })) || [],
        });
      }
    };

    fetchOrder();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!order?.id || !paymentMethod) return;

    const result = await confirmOrder(order.id);

    if (result?.isSuccess) {
      await Swal.fire({
        title: "Order confirmed!",
        icon: "success",
        // confirmButtonColor: "#0d6efd",
        timer: 1800,
        showConfirmButton: true,
      });

      const updatedOrder = await getOrder();
      setOrder(updatedOrder?.data || null);
      setPaymentMethod("");
    }
  };

  const hasItems = order?.orderDetails?.length > 0;

  const formattedDate = order?.date
    ? new Date(order.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  const itemCount =
    order?.orderDetails?.reduce(
      (total, item) => total + (item.quantity || 0),
      0,
    ) || 0;

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
          <div
            className="modal-content border-0 shadow-lg rounded-4 overflow-hidden"
            style={{
              minHeight: "calc(100vh - 2rem)",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            {/* Header */}
            <div className="modal-header px-3 py-2 bg-dark text-white border-0">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="rounded-3 bg-primary d-flex align-items-center justify-content-center"
                  style={{
                    width: "36px",
                    height: "36px",
                  }}
                >
                  <i className="bi bi-bag-check"></i>
                </div>

                <div>
                  <h6 className="modal-title mb-0 fw-semibold">
                    Order #{order?.id || "—"}
                  </h6>

                  {formattedDate && (
                    <small className="text-white-50">
                      {formattedDate} · {itemCount} item
                      {itemCount !== 1 ? "s" : ""}
                    </small>
                  )}
                </div>
              </div>

              <button
                onClick={onClose}
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
              />
            </div>

            {/* Body */}
            <div className="modal-body p-3 bg-light">
              {/* Loading */}
              {!order && isLoading && (
                <div
                  className="bg-white rounded-3 d-flex align-items-center justify-content-center gap-2"
                  style={{ minHeight: "300px" }}
                >
                  <div
                    className="spinner-border spinner-border-sm text-primary"
                    role="status"
                  />

                  <span className="text-muted">Loading order...</span>
                </div>
              )}

              {/* Empty */}
              {!isLoading && !hasItems && (
                <div
                  className="bg-white rounded-3 d-flex flex-column justify-content-center align-items-center text-center"
                  style={{ minHeight: "500px" }}
                >
                  <i
                    className="bi bi-bag-x text-secondary mb-2"
                    style={{ fontSize: "3rem" }}
                  />

                  <h6 className="fw-semibold mb-1">No pending items</h6>

                  <small className="text-muted">
                    Your order doesn't have any pending items.
                  </small>
                </div>
              )}

              {/* Order */}
              {hasItems && (
                <form id="confirmOrderForm" onSubmit={handleSubmit}>
                  <fieldset disabled={isLoading}>
                    <div className="bg-black rounded-3 border p-3 mb-2 text-white">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div>
                          <h6 className="mb-0 fw-semibold">
                            <i className="bi bi-info-circle text-warning me-2"></i>
                            Pay with ·
                            {paymentMethod ? (
                              <small className="text-white-50 ms-1">
                                {paymentMethod}
                              </small>
                            ) : (
                              <span className="text-white-50 ms-1">--</span>
                            )}
                          </h6>

                          <small className="text-white-50">
                            Select a Payment Method
                          </small>
                        </div>

                        <div>
                          <h6 className="mb-0 fw-semibold">Total</h6>

                          <span className="fs-5 fw-bold">
                            ${Number(order.totalPrice || 0).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="row g-2">
                        {PAYMENT_METHODS.map((method) => {
                          const selected = paymentMethod === method.value;

                          return (
                            <div className="col-4" key={method.value}>
                              <button
                                type="button"
                                onClick={() => setPaymentMethod(method.value)}
                                className={`btn btn-sm w-100 py-2 ${
                                  selected ? "btn-primary" : "btn-light"
                                }`}
                              >
                                <i className={`bi ${method.icon} me-1`}></i>

                                {method.value}

                                {selected && (
                                  <i className="bi bi-check ms-1"></i>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white rounded-3 border overflow-hidden">
                      <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
                        <h6 className="mb-0 fw-semibold">Order items</h6>

                        <small className="text-muted">
                          {itemCount} item
                          {itemCount !== 1 ? "s" : ""}
                        </small>
                      </div>

                      <div className="p-1">
                        <OrderTable order={order} setOrder={setOrder} />
                      </div>
                    </div>
                  </fieldset>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="modal-footer px-3 py-2 bg-white border-top">
              <button
                onClick={onClose}
                type="button"
                className="btn btn-light border px-3 fw-medium"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-success px-3 fw-medium"
                form="confirmOrderForm"
                disabled={!hasItems || !paymentMethod || isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    />
                    Confirming...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check2-circle me-1"></i>
                    Confirm Order
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
