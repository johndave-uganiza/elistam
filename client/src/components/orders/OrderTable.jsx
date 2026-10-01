import { useState } from "react";
import { API_BASE_URL, IMAGE_PLACEHOLDER_URL } from "../../utilities/constants";
import OrderDetailModal from "./OrderDetailModal";

function OrderTable({ order, onRemove, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [orderDetail, setOrderDetail] = useState({
    id: null,
    orderId: null,
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    image: "",
  });

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
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setOrderDetail((prev) => ({ ...prev, quantity: Number(e.target.value) }));
  };

  return (
    <div
      className="table-responsive-sm overflow-auto"
      style={{
        maxHeight: "350px",
      }}
    >
      <table className="table table-sm table-bordered table-hover">
        <thead className="table-dark text-nowrap">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Item No.</th>
            <th scope="col">Name</th>
            <th scope="col">Qty</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {order?.orderDetails.map((detail, index) => (
            <tr key={index}>
              <td>
                <img
                  src={`${detail.image?.substring(0, 6) === "images" ? API_BASE_URL.concat("/") : ""}${detail.image || IMAGE_PLACEHOLDER_URL}`}
                  onError={(e) => {
                    e.target.src = IMAGE_PLACEHOLDER_URL;
                  }}
                  style={{
                    objectFit: "cover",
                    maxHeight: "50px",
                  }}
                />
              </td>
              <td>ITM-###</td>
              <td className="text-wrap">{detail.name}</td>
              <td>
                <span className="fw-medium">{detail.quantity}</span>
                <i
                  className="bi bi-pencil ms-2  text-black-50"
                  style={{ fontSize: "14px" }}
                  onClick={() => handleEdit(detail)}
                ></i>
              </td>
              <td>
                <span className="fw-medium">{detail.price}</span>
                {/* {eListam.utils.formatCurrencyToPHP(item.price)} */}
              </td>
              <td>
                {detail.quantity * detail.price}
                {/* {eListam.utils.formatCurrencyToPHP(
                                  item.quantity * item.price,
                                )} */}
              </td>
              <td className="text-center text-nowrap">
                <button
                  type="button"
                  onClick={() => onRemove(order.id, detail)}
                  className="btn btn-sm btn-outline-danger me-1 mb-1 mb-lg-0"
                >
                  <i className="bi bi-x-lg"></i>
                  <span className="ms-1 d-none d-md-inline ">Remove</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <OrderDetailModal
          onClose={handleClose}
          // onSave={handleSave}
          onChange={handleInputChange}
          orderDetail={orderDetail}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}

export default OrderTable;
