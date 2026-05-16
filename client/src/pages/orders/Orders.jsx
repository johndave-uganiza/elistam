import { useContext, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import EditOrderDetailForm from "../../components/orders/EditOrderDetailForm";
import DeleteOrderDetailForm from "../../components/orders/DeleteOrderDetailForm";
import { formatCurrency } from "../../utilities/currency";

function Orders() {
  const [showEditOrderDetailForm, setShowEditOrderDetailForm] = useState(false);
  const [showDeleteOrderDetailForm, setShowDeleteOrderDetailForm] =
    useState(false);
  const [currentOrderDetail, setCurrentOrderDetail] = useState(null);
  const { order, setOrder } = useContext(OrderContext);

  function getTotalOrderQuantiy() {
    return order.reduce(
      (prev, current) => Number(prev) + Number(current.quantity),
      0,
    );
  }

  function getTotalOrderPrice() {
    return Number(
      order.reduce(
        (prev, current) =>
          Number(prev) + Number(current.quantity) * Number(current.price),
        0,
      ),
    );
  }

  function handleEditOrderDetail(orderDetail) {
    setCurrentOrderDetail(orderDetail);
    setShowEditOrderDetailForm(true);
  }

  function handleUpdateOrderDetail(e) {
    const formData = new FormData(e.target);
    const quantity = formData.get("quantity");
    const updatedOrder = order.map((order) => {
      if (order.id === currentOrderDetail.id) {
        return {
          ...order,
          quantity: quantity,
        };
      }

      return order;
    });

    setOrder(updatedOrder);
    setShowEditOrderDetailForm(false);
    localStorage.setItem("order", JSON.stringify(updatedOrder));
    setShowEditOrderDetailForm(false);
  }

  function handleDeleteOrderDetail(orderDetail) {
    setCurrentOrderDetail(orderDetail);
    setShowDeleteOrderDetailForm(true);
  }

  function handleConfirmDeleteOrderDetail(e) {
    e.preventDefault();
    const orderState = order.filter(
      (order) => order.id !== currentOrderDetail.id,
    );
    localStorage.setItem("order", JSON.stringify(orderState));
    setOrder(orderState);
    setShowDeleteOrderDetailForm(false);
  }

  return (
    <div className="container-fluid flex-fill d-flex flex-column py-3">
      {/* <div className="row p-3">
        <div className="p-0 d-flex justify-content-between align-items-center">
          <h3 className="">orders</h3>
        </div>
      </div> */}
      <div className="row flex-fill">
        <div className="col-12 d-flex flex-column">
          <div className="card bg-primary-subtle flex-fill">
            <div className="card-header bg-black">
              <h4 className="card-title d-flex justify-content-between align-items-center mb-0">
                <span>Order Summary</span>
                <span className="fs-6">{`Date: ${new Date().toLocaleDateString()}`}</span>
              </h4>
            </div>
            <div className="card-body bg-secondary d-flex flex-column flex-fill">
              <form className="flex-fill d-flex flex-column">
                <div className="row">
                  <div className="col-auto">
                    <label
                      htmlFor="inputPassword4"
                      className="form-label form-label-sm m-0"
                    >
                      Total Product Type:
                    </label>

                    <input
                      className="form-control fw-bold"
                      disabled
                      value={`${order?.length > 0 ? order.length : "0"}`}
                    />
                  </div>
                  <div className="col-auto ms-md-auto">
                    <label className="form-label form-label-sm m-0">
                      Total Quantity:
                    </label>

                    <input
                      className="form-control fw-bold"
                      disabled
                      value={`${getTotalOrderQuantiy().toFixed(1)} unit(s)`}
                    />
                  </div>
                  <div className="col-auto">
                    <label htmlFor="inputEmail4" className="form-label m-0">
                      Total Price:
                    </label>

                    <input
                      className="form-control fw-bold"
                      disabled
                      value={formatCurrency(
                        getTotalOrderPrice(),
                        "PHP",
                        "en-PH",
                      )}
                    />
                  </div>
                </div>
                <hr />
                <div className="row flex-fill">
                  <div className="overflow-auto" style={{ maxHeight: "340px" }}>
                    <table className="table table-bordered table-hover table-striped small text-truncate">
                      <thead>
                        <tr>
                          {/* <th scope="col">Order #</th> */}
                          <th scope="col">Product</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Price</th>
                          <th scope="col">Total</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.map((item, index) => (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? "table-secondary" : ""}
                          >
                            {/* <th scope="row">{item.id}</th> */}
                            <td
                              className="text-truncate"
                              style={{ maxWidth: "80px" }}
                            >
                              {item.name}
                            </td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>
                              {(item.quantity * item.price).toLocaleString()}
                            </td>
                            <td>
                              <a
                                onClick={() => handleDeleteOrderDetail(item)}
                                className="btn btn-outline-danger me-3 btn-sm mb-1 mb-lg-0"
                              >
                                Delete
                              </a>
                              <a
                                onClick={() => handleEditOrderDetail(item)}
                                className="btn btn-outline-success me-3 btn-sm mb-1 mb-lg-0"
                              >
                                Edit
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-12 d-flex flex-sm-row flex-column justify-content-between align-items-center gap-md-0 gap-3">
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <input
                          className="form-check-input bg-warning"
                          type="radio"
                          id="gridCheck"
                          name="paymentType"
                          // checked={true}
                        />
                        <label
                          className="form-check-label small"
                          htmlFor="gridCheck"
                        >
                          Regular
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gridCheck"
                          name="paymentType"
                          disabled
                        />
                        <label
                          className="form-check-label small"
                          htmlFor="gridCheck"
                        >
                          Full Credit
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gridCheck"
                          name="paymentType"
                          disabled
                        />
                        <label
                          className="form-check-label small"
                          htmlFor="gridCheck"
                        >
                          Partial Credit
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success btn-sm">
                      <span
                        className="text-nowrap fw-bold"
                        // style={{ fontSize: "0.75rem" }}
                      >
                        Place Order
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <EditOrderDetailForm
        showEditOrderDetailForm={showEditOrderDetailForm}
        setShowEditOrderDetailForm={setShowEditOrderDetailForm}
        currentOrderDetail={currentOrderDetail}
        setCurrentOrderDetail={setCurrentOrderDetail}
        handleUpdateOrderDetail={handleUpdateOrderDetail}
      />

      <DeleteOrderDetailForm
        showDeleteOrderDetailForm={showDeleteOrderDetailForm}
        setShowDeleteOrderDetailForm={setShowDeleteOrderDetailForm}
        handleConfirmDeleteOrderDetail={handleConfirmDeleteOrderDetail}
        currentOrderDetail={currentOrderDetail}
        setCurrentOrderDetail={setCurrentOrderDetail}
      />
    </div>
  );
}

export default Orders;
