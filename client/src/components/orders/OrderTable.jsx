import { useContext, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import {
  API_BASE_URL,
  IMAGE_PLACEHOLDER_URL,
} from "../../utilities/constants";
import OrderDetailModal from "./OrderDetailModal";

function OrderTable({ order, setOrder }) {
  const { getOrder, updateOrder } = useContext(OrderContext);

  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [orderDetail, setOrderDetail] = useState({
    id: null,
    orderId: null,
    productId: null,
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    image: "",
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(value) || 0);
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

  const handleRemove = async (orderId, detailToRemove) => {
    if (!order || isUpdating) return;

    const previousOrder = order;

    const updatedOrderDetails = order.orderDetails.filter(
      (detail) => detail.id !== detailToRemove.id
    );

    const updatedOrder = {
      ...order,
      totalPrice: updatedOrderDetails.reduce(
        (sum, detail) =>
          sum + Number(detail.price) * Number(detail.quantity),
        0
      ),
      orderDetails: updatedOrderDetails,
    };

    try {
      setIsUpdating(true);

      // Optimistic update
      setOrder(updatedOrder);

      const result = await updateOrder(orderId, updatedOrder);

      if (result?.isSuccess) {
        const refreshedOrder = await getOrder();

        if (refreshedOrder?.data) {
          setOrder(refreshedOrder.data);
        }
      } else {
        // Rollback if update failed
        setOrder(previousOrder);
      }
    } catch (error) {
      console.error("Failed to remove order item:", error);

      // Rollback
      setOrder(previousOrder);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdate = async (orderId, updatedDetail) => {
    if (!order || isUpdating) return;

    const previousOrder = order;

    const updatedOrderDetails = order.orderDetails.map((detail) =>
      detail.id === updatedDetail.id &&
      updatedDetail.orderId === orderId
        ? updatedDetail
        : detail
    );

    const updatedOrder = {
      ...order,
      totalPrice: updatedOrderDetails.reduce(
        (sum, detail) =>
          sum + Number(detail.price) * Number(detail.quantity),
        0
      ),
      orderDetails: updatedOrderDetails,
    };

    try {
      setIsUpdating(true);

      // Optimistic update
      setOrder(updatedOrder);

      const result = await updateOrder(orderId, updatedOrder);

      if (result?.isSuccess) {
        setShowModal(false);

        const refreshedOrder = await getOrder();

        if (refreshedOrder?.data) {
          setOrder(refreshedOrder.data);
        }
      } else {
        setOrder(previousOrder);
      }
    } catch (error) {
      console.error("Failed to update order item:", error);
      setOrder(previousOrder);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEdit = (detail) => {
    setOrderDetail({
      id: detail.id,
      orderId: order.id,
      productId: detail.productId,
      name: detail.name,
      description: detail.description,
      price: detail.price,
      quantity: detail.quantity,
      image: detail.image,
    });

    setShowModal(true);
  };

  const handleClose = () => {
    if (!isUpdating) {
      setShowModal(false);
    }
  };

  const handleInputChange = (e) => {
    const quantity = Math.max(1, Number(e.target.value) || 1);

    setOrderDetail((prev) => ({
      ...prev,
      quantity,
    }));
  };

  const orderItems = order?.orderDetails || [];

  return (
    <>
      <div
        className="overflow-auto"
        style={{
          minHeight: "400px",
        }}
      >
        {orderItems.length === 0 ? (
          <div className="text-center text-muted py-4">
            <i
              className="bi bi-bag-x d-block mb-2"
              style={{ fontSize: "2rem" }}
            />

            <small>No items in this order.</small>
          </div>
        ) : (
          <table
            className="table table-sm align-middle mb-0"
            style={{
              minWidth: "620px",
            }}
          >
            <thead
              className="table-light"
              style={{
                position: "sticky",
                top: 0,
                zIndex: 2,
              }}
            >
              <tr className="text-muted small text-uppercase">
                <th
                  className="border-0 ps-3 py-2"
                  style={{ width: "45%" }}
                >
                  Product
                </th>

                <th
                  className="border-0 text-center py-2"
                  style={{ width: "12%" }}
                >
                  Qty
                </th>

                <th
                  className="border-0 text-end py-2"
                  style={{ width: "15%" }}
                >
                  Price
                </th>

                <th
                  className="border-0 text-end py-2"
                  style={{ width: "18%" }}
                >
                  Total
                </th>

                <th
                  className="border-0 text-center pe-3 py-2"
                  style={{ width: "10%" }}
                >
                  <span className="visually-hidden">
                    Actions
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {orderItems.map((detail) => {
                const itemTotal =
                  Number(detail.price) *
                  Number(detail.quantity);

                return (
                  <tr
                    key={detail.id}
                    className="border-bottom"
                  >
                    {/* Product */}
                    <td className="ps-3 py-2">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="rounded-3 bg-light border flex-shrink-0 d-flex align-items-center justify-content-center overflow-hidden"
                          style={{
                            width: "48px",
                            height: "48px",
                          }}
                        >
                          <img
                            src={getImageUrl(detail.image)}
                            alt={detail.name || "Product"}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src =
                                IMAGE_PLACEHOLDER_URL;
                            }}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        <div
                          className="min-width-0"
                          style={{
                            minWidth: 0,
                          }}
                        >
                          <div
                            className="fw-semibold text-dark text-truncate"
                            title={detail.name}
                          >
                            {detail.name}
                          </div>

                          {detail.description && (
                            <small
                              className="text-muted d-block text-truncate"
                              style={{
                                maxWidth: "240px",
                              }}
                              title={detail.description}
                            >
                              {detail.description}
                            </small>
                          )}

                          <small className="text-muted">
                            ITM-{String(detail.productId || detail.id).padStart(
                              3,
                              "0"
                            )}
                          </small>
                        </div>
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-sm btn-light border rounded-pill px-2 py-1"
                        onClick={() => handleEdit(detail)}
                        disabled={isUpdating}
                        title="Edit quantity"
                      >
                        <span className="fw-semibold">
                          {detail.quantity}
                        </span>

                        <i className="bi bi-pencil ms-1 text-muted small"></i>
                      </button>
                    </td>

                    {/* Price */}
                    <td className="text-end text-nowrap">
                      <span className="text-muted small">
                        {formatCurrency(detail.price)}
                      </span>
                    </td>

                    {/* Total */}
                    <td className="text-end text-nowrap">
                      <span className="fw-semibold">
                        {formatCurrency(itemTotal)}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="text-center pe-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleRemove(order.id, detail)
                        }
                        className="btn btn-sm btn-light text-danger rounded-circle"
                        style={{
                          width: "32px",
                          height: "32px",
                          padding: 0,
                        }}
                        disabled={isUpdating}
                        title={`Remove ${detail.name}`}
                        aria-label={`Remove ${detail.name}`}
                      >
                        {isUpdating ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            style={{
                              width: "0.8rem",
                              height: "0.8rem",
                            }}
                          />
                        ) : (
                          <i className="bi bi-trash3"></i>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <OrderDetailModal
          onClose={handleClose}
          onChange={handleInputChange}
          orderDetail={orderDetail}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}

export default OrderTable;
