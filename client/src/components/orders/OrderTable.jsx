import { API_BASE_URL, IMAGE_PLACEHOLDER_URL } from "../../utilities/constants";

function OrderTable({ order }) {
  return (
    <div
      className="table-responsive-sm overflow-auto"
      style={{
        maxHeight: "350px",
        // overflowY: "auto",
      }}
    >
      <table className="table table-sm table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            {/* <th scope="col">Order #</th> */}
            <th scope="col">Image</th>
            <th scope="col">Product</th>
            <th scope="col">Qty</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {order.orderDetails.map((item, index) => (
            <tr key={index}>
              <td>
                <img
                  src={`${item.image?.substring(0, 6) === "images" ? API_BASE_URL.concat("/") : ""}${item.image || IMAGE_PLACEHOLDER_URL}`}
                  onError={(e) => {
                    e.target.src = IMAGE_PLACEHOLDER_URL;
                  }}
                  style={{
                    objectFit: "cover",
                    maxHeight: "50px",
                  }}
                />
              </td>
              <td
                className="text-wrap"
                // style={{ maxWidth: "120px" }}
              >
                {item.name}
              </td>
              <td>{item.quantity}</td>
              <td>
                {item.price}
                {/* {eListam.utils.formatCurrencyToPHP(item.price)} */}
              </td>
              <td>
                {item.quantity * item.price}
                {/* {eListam.utils.formatCurrencyToPHP(
                                  item.quantity * item.price,
                                )} */}
              </td>
              <td>
                <a
                  // onClick={() => handleDeleteOrderDetail(item)}
                  className="btn btn-sm btn-outline-danger me-1 mb-1 mb-lg-0"
                >
                  <i className="bi bi-x"></i>
                </a>
                <a
                  // onClick={() => handleEditOrderDetail(item)}
                  className="btn btn-sm btn-outline-success me-1 mb-1 mb-lg-0"
                >
                  <i className="bi bi-list"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
