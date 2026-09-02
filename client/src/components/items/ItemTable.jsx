import { API_BASE_URL, IMAGE_PLACEHOLDER_URL } from "../../utilities/constants";

function ItemTable({ items, onEdit, onDelete }) {
  return (
    <div className="table-responsive-sm">
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Expiration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {items?.length > 0
            ? items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`${item.image.substring(0, 6) === "images" ? API_BASE_URL.concat("/") : ""}${item.image || IMAGE_PLACEHOLDER_URL}`}
                      onError={(e) => {
                        e.target.src = IMAGE_PLACEHOLDER_URL;
                      }}
                      style={{ width: "60px", height: "60px" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{"01/01/1900"}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary fw-medium"
                        onClick={() => onEdit(item)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger fw-medium"
                        onClick={() => onDelete(item)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default ItemTable;
