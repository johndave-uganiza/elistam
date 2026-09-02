import { toast } from "react-toastify";

function ItemModal({ onClose, isEditing, onSubmit, onChange, formData }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = [];
    if (!formData.name.trim()) {
      errors.push("Name is required.");
    }

    if (!formData.description.trim()) {
      errors.push("Description is required.");
    }

    if (!formData.price || formData.price < 0) {
      errors.push("Price is required.");
    }

    if (!formData.quantity || formData.quantity < 0) {
      errors.push("Quantity is required.");
    }

    if (errors.length > 0) {
      toast.error(
        <div>
          {errors.map((error) => (
            <li className="ms-3">{error}</li>
          ))}
        </div>,
      );
      return;
    }
    onSubmit(formData);
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
              <h1 className="modal-title fs-5">
                {isEditing ? "Edit Item" : "Add Item"}
              </h1>
              <button
                onClick={onClose}
                type="button"
                className="btn-close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} id="addItemForm">
                <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label">
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      name="name"
                      className="form-control"
                      type="text"
                      placeholder=""
                      value={formData.name || ""}
                      onChange={onChange}
                    ></input>
                  </div>
                  <div className="col-6">
                    <label className="form-label">Expiration</label>
                    <input
                      name="expiration"
                      className="form-control"
                      type="date"
                      placeholder=""
                      value={formData.expiration || ""}
                      onChange={onChange}
                    ></input>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    name="description"
                    className="form-control"
                    placeholder=""
                    id="floatingTextarea2"
                    style={{ height: "80px" }}
                    value={formData.description || ""}
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Price <span className="text-danger">*</span>
                  </label>
                  <input
                    name="price"
                    className="form-control"
                    type="number"
                    placeholder="0.00"
                    value={formData.price || ""}
                    onChange={onChange}
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Quantity <span className="text-danger">*</span>
                  </label>
                  <input
                    name="quantity"
                    className="form-control"
                    type="number"
                    placeholder="0.00"
                    value={formData.quantity || ""}
                    onChange={onChange}
                  ></input>
                </div>

                <div className="mb-3">
                  <label className="form-label">Image:</label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    accept="image/*"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer bg-secondary-subtle">
              <button onClick={onClose} type="button" className="btn btn-dark">
                Cancel
              </button>
              <button
                form="addItemForm"
                type="submit"
                className="btn btn-primary"
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemModal;
