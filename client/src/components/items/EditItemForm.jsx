import { useEffect, useRef } from "react";
import { Modal } from "bootstrap";

function EditItemForm({
  showEditItemForm,
  setShowEditItemForm,
  handleUpdateItem,
  itemDetailForm,
  setItemDetailForm,
}) {
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);

  useEffect(() => {
    if (!modalRef.current) return;

    if (!bsModalRef.current) {
      bsModalRef.current = new Modal(modalRef.current, { backdrop: "static" });
    }

    if (showEditItemForm) {
      bsModalRef.current.show();
    } else {
      bsModalRef.current.hide();
    }
  }, [showEditItemForm]);

  return (
    <div ref={modalRef} className="modal fade" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleUpdateItem}>
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-warning"
                id="staticBackdropLabel"
              >
                Edit Item
              </h1>
              <button
                onClick={() => {
                  setShowEditItemForm(false);
                }}
                type="button"
                className="btn-close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  name="name"
                  className="form-control"
                  type="text"
                  value={itemDetailForm?.name}
                  onChange={(e) => {
                    setItemDetailForm({
                      ...itemDetailForm,
                      [e.target.name]: e.target.value,
                    });
                  }}
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Price (USD)</label>
                <input
                  name="price"
                  className="form-control"
                  type="number"
                  value={itemDetailForm?.price}
                  onChange={(e) => {
                    setItemDetailForm({
                      ...itemDetailForm,
                      [e.target.name]: e.target.value,
                    });
                  }}
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Available Stock</label>
                <input
                  name="quantity"
                  className="form-control"
                  type="number"
                  value={itemDetailForm?.quantity}
                  onChange={(e) => {
                    setItemDetailForm({
                      ...itemDetailForm,
                      [e.target.name]: e.target.value,
                    });
                  }}
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Expiration Date</label>
                <input
                  name="expirationDate"
                  className="form-control"
                  type="date"
                  placeholder="Expiration Date"
                  value={itemDetailForm?.expirationDate}
                  onChange={(e) => {
                    setItemDetailForm({
                      ...itemDetailForm,
                      expirationDate: e.target.value,
                    });
                  }}
                ></input>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => {
                  setShowEditItemForm(false);
                }}
                type="button"
                className="btn btn-info"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-warning">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditItemForm;
