import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import OrderTable from "./OrderTable";
import Swal from "sweetalert2";

function OrderModal({ onClose }) {
  const { getOrder, confirmOrder, isLoading, updateOrder } =
    useContext(OrderContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getOrder();
      if (result?.data) {
        const { id, date, totalPrice, orderDetails } = result.data;
        setOrder({
          date: date,
          id: id,
          totalPrice: totalPrice,
          orderDetails: orderDetails?.map((detail) => ({
            id: detail.id,
            orderId: id,
            productId: detail.productId,
            name: detail.name,
            description: detail.description,
            price: detail.price,
            quantity: detail.quantity,
            image: detail.image,
          })),
        });
      }
    };

    fetchOrder();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await confirmOrder(order.id);
    if (result?.isSuccess) {
      Swal.fire({
        title: `Order confirmed successfully!`,
        icon: "success",
        timer: 2000,
        showConfirmButton: true,
      });
      const result = await getOrder();
      setOrder(result.data);
    }
  };

  const handleRemove = async (orderId, orderDetail) => {
    try {
      const updatedOrder = {
        ...order,
        orderDetails: order.orderDetails.filter(
          (detail) => detail.id !== orderDetail.id,
        ),
      };

      setOrder(updatedOrder);

      const result = await updateOrder(orderId, updatedOrder);

      if (result.isSuccess) {
        const order = await getOrder();
        setOrder(order.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (orderId, orderDetail) => {
    try {
      const updatedOrder = {
        ...order,
        orderDetails: order.orderDetails.map((detail) =>
          detail.id == orderDetail.id && orderDetail.orderId == orderId
            ? orderDetail
            : detail,
        ),
      };

      setOrder(updatedOrder);

      const result = await updateOrder(orderId, updatedOrder);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="modal-backdrop show"></div>
      <div
        className="modal fade show"
        tabIndex="-1"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-secondary-subtle">
              <h1 className="modal-title fs-5">Order-###</h1>
              <button
                onClick={onClose}
                type="button"
                className="btn-close"
              ></button>
            </div>
            <div className="modal-body">
              {!order && isLoading && (
                <div
                  className="card d-flex justify-content-center align-items-center text-secondary"
                  style={{ minHeight: "400px" }}
                >
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <h3 className="ms-2">Loading...</h3>
                  </div>
                </div>
              )}

              {(!order || order?.orderDetails?.length === 0) && !isLoading && (
                <div
                  className="card d-flex justify-content-center align-items-center text-secondary"
                  style={{ minHeight: "400px" }}
                >
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <h3>There are 0 pending items.</h3>
                    <i
                      className="bi bi-bag text-secondary"
                      style={{ fontSize: "7rem" }}
                    ></i>
                  </div>
                </div>
              )}
              {order?.orderDetails?.length > 0 && (
                <form
                  id="confirmOrderForm"
                  onSubmit={handleSubmit}
                  className="flex-fill d-flex flex-column"
                  style={{ minHeight: "400px" }}
                >
                  <fieldset disabled={isLoading}>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center gap-2 justify-content-end">
                        <div className="dropdown">
                          <button
                            className="btn btn-sm dropdown-toggle border-black text-muted"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Select Payment Method *
                          </button>
                          <ul className="dropdown-menu">
                            <hr className="p-0 m-0 mx-1" />
                            <li>
                              <a className="dropdown-item">Cash</a>
                            </li>
                            <hr className="p-0 m-0 mx-1" />
                            <li>
                              <a className="dropdown-item">Stripe</a>
                            </li>
                            <hr className="p-0 m-0 mx-1" />
                            <li>
                              <a className="dropdown-item">Credit</a>
                            </li>
                            <hr className="p-0 m-0 mx-1" />
                          </ul>
                        </div>
                      </div>
                    </div>
                    <hr className="my-2" />
                    <div className="row flex-fill">
                      <OrderTable
                        order={order}
                        onRemove={handleRemove}
                        onUpdate={handleUpdate}
                      />
                    </div>
                    <hr className="py-1 my-0" />
                    <div className="d-flex justify-content-end">
                      <div className="d-flex align-items-center gap-2 justify-content-end col-2">
                        <label className="fw-medium">Total:</label>
                        <input
                          className="form-control bg-white fw-bold text-end"
                          style={{ minWidth: "100px" }}
                          disabled
                          placeholder="$0.00"
                          value={`$${order?.totalPrice?.toFixed(2)}`}
                        />
                      </div>
                    </div>
                  </fieldset>
                </form>
              )}
            </div>
            <div className="modal-footer bg-secondary-subtle">
              <button onClick={onClose} type="button" className="btn btn-dark">
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                form="confirmOrderForm"
                disabled={!order}
              >
                {isLoading && (
                  <div
                    className="spinner-border spinner-border-sm me-1"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
