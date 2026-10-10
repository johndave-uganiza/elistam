import { toast } from "react-toastify";

function ItemModal({
  onClose,
  isEditing,
  onSubmit,
  onChange,
  formData,
  isLoading,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = [];

    if (!formData.name?.trim()) {
      errors.push("Name is required.");
    }

    if (!formData.description?.trim()) {
      errors.push("Description is required.");
    }

    if (
      formData.price === "" ||
      formData.price === null ||
      formData.price === undefined ||
      Number(formData.price) < 0
    ) {
      errors.push("A valid price is required.");
    }

    if (
      formData.quantity === "" ||
      formData.quantity === null ||
      formData.quantity === undefined ||
      Number(formData.quantity) < 0
    ) {
      errors.push("A valid quantity is required.");
    }

    if (errors.length > 0) {
      toast.error(
        <div>
          <div className="fw-semibold mb-1">Please check the following:</div>

          <ul className="mb-0 ps-3">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>,
      );

      return;
    }

    onSubmit(formData);
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{
          display: "block",
          overflowY: "auto",
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          style={{
            minHeight: "calc(100vh - 2rem)",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div
            className="modal-content border-0 shadow-lg rounded-4 overflow-hidden"
            style={{
              maxHeight: "calc(100vh - 2rem)",
            }}
          >
            {/* Header */}
            <div className="modal-header bg-dark text-white border-0 px-3 py-2 flex-shrink-0">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="rounded-3 bg-primary d-flex align-items-center justify-content-center"
                  style={{
                    width: "38px",
                    height: "38px",
                  }}
                >
                  <i
                    className={`bi ${
                      isEditing ? "bi-pencil-square" : "bi-box-seam"
                    }`}
                  ></i>
                </div>

                <div>
                  <h6 className="modal-title mb-0 fw-semibold">
                    {isEditing ? "Edit Item" : "Add Item"}
                  </h6>

                  <small className="text-white-50">
                    {isEditing
                      ? "Update item information"
                      : "Add a new inventory item"}
                  </small>
                </div>
              </div>

              <button
                onClick={onClose}
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
                disabled={isLoading}
              />
            </div>

            {/* Scrollable Body */}
            <div
              className="modal-body bg-light px-3 py-2"
              style={{
                overflowY: "auto",
                minHeight: 0,
              }}
            >
              <form onSubmit={handleSubmit} id="addItemForm">
                {/* Basic Information */}
                <div className="bg-white border rounded-3 p-3 mb-2">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <i className="bi bi-info-circle text-primary"></i>

                    <div>
                      <h6 className="fw-semibold mb-0">Basic information</h6>

                      <small className="text-muted">Item details</small>
                    </div>
                  </div>

                  <div className="row g-2">
                    {/* Name */}
                    <div className="col-md-7">
                      <label
                        htmlFor="itemName"
                        className="form-label small fw-semibold mb-1"
                      >
                        Item name <span className="text-danger">*</span>
                      </label>

                      <input
                        id="itemName"
                        name="name"
                        className="form-control"
                        type="text"
                        placeholder="e.g. Premium Coffee"
                        value={formData.name || ""}
                        onChange={onChange}
                        disabled={isLoading}
                        autoComplete="off"
                      />
                    </div>

                    {/* Expiration */}
                    <div className="col-md-5">
                      <label
                        htmlFor="itemExpiration"
                        className="form-label small fw-semibold mb-1"
                      >
                        Expiration
                      </label>

                      <input
                        id="itemExpiration"
                        name="expirationDate"
                        className="form-control"
                        type="date"
                        value={formData.expirationDate || ""}
                        onChange={onChange}
                        disabled={isLoading}
                      />
                    </div>

                    {/* Description */}
                    <div className="col-12">
                      <label
                        htmlFor="itemDescription"
                        className="form-label small fw-semibold mb-1"
                      >
                        Description <span className="text-danger">*</span>
                      </label>

                      <textarea
                        id="itemDescription"
                        name="description"
                        className="form-control"
                        placeholder="Describe the item..."
                        rows="2"
                        value={formData.description || ""}
                        onChange={onChange}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing & Stock */}
                <div className="bg-white border rounded-3 p-3 mb-2">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <i className="bi bi-bar-chart text-primary"></i>

                    <div>
                      <h6 className="fw-semibold mb-0">Pricing & stock</h6>

                      <small className="text-muted">
                        Price and available quantity
                      </small>
                    </div>
                  </div>

                  <div className="row g-2">
                    {/* Price */}
                    <div className="col-6">
                      <label
                        htmlFor="itemPrice"
                        className="form-label small fw-semibold mb-1"
                      >
                        Price <span className="text-danger">*</span>
                      </label>

                      <div className="input-group">
                        <span className="input-group-text bg-light">$</span>

                        <input
                          id="itemPrice"
                          name="price"
                          className="form-control"
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          value={formData.price ?? ""}
                          onChange={onChange}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-6">
                      <label
                        htmlFor="itemQuantity"
                        className="form-label small fw-semibold mb-1"
                      >
                        Quantity <span className="text-danger">*</span>
                      </label>

                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="bi bi-box"></i>
                        </span>

                        <input
                          id="itemQuantity"
                          name="quantity"
                          className="form-control"
                          type="number"
                          min="0"
                          step="1"
                          placeholder="0"
                          value={formData.quantity ?? ""}
                          onChange={onChange}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="bg-white border rounded-3 p-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <i className="bi bi-image text-primary"></i>

                    <div>
                      <h6 className="fw-semibold mb-0">Item image</h6>

                      <small className="text-muted">
                        Optional product image
                      </small>
                    </div>
                  </div>

                  <label
                    htmlFor="itemImage"
                    className="d-flex align-items-center gap-3 border rounded-3 px-3 py-2 bg-light"
                    style={{
                      cursor: isLoading ? "not-allowed" : "pointer",
                    }}
                  >
                    <div
                      className="rounded-3 bg-white border d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      <i className="bi bi-cloud-arrow-up text-primary"></i>
                    </div>

                    <div className="flex-grow-1 text-truncate">
                      <div className="fw-medium">Choose an image</div>

                      <small className="text-muted">JPG, PNG, WEBP</small>
                    </div>

                    <span className="btn btn-sm btn-outline-primary flex-shrink-0">
                      Browse
                    </span>

                    <input
                      id="itemImage"
                      type="file"
                      className="d-none"
                      name="image"
                      accept="image/*"
                      onChange={onChange}
                      disabled={isLoading}
                    />
                  </label>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="modal-footer bg-white border-top px-3 py-2 flex-shrink-0">
              <button
                onClick={onClose}
                type="button"
                className="btn btn-light border px-3"
                disabled={isLoading}
              >
                Cancel
              </button>

              <button
                form="addItemForm"
                type="submit"
                className="btn btn-primary px-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />

                    {isEditing ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>
                    <i
                      className={`bi ${
                        isEditing ? "bi-check2" : "bi-plus-lg"
                      } me-1`}
                    />

                    {isEditing ? "Update Item" : "Add Item"}
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

export default ItemModal;
