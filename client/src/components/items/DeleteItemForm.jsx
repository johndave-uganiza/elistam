import { useEffect, useRef } from "react";
import { Modal } from "bootstrap";

function DeleteItemForm({
  showDeleteItemForm,
  setShowDeleteItemForm,
  currentItem,
  handleDeleteItem,
  setCurrentItem,
}) {
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);

  useEffect(() => {
    if (!modalRef.current) return;

    if (!bsModalRef.current) {
      bsModalRef.current = new Modal(modalRef.current, { backdrop: "static" });
    }

    if (showDeleteItemForm) {
      bsModalRef.current.show();
    } else {
      bsModalRef.current.hide();
    }
  }, [showDeleteItemForm]);

  return (
    <div ref={modalRef} className="modal fade" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={() => handleDeleteItem(currentItem.id)}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                <span className="text-danger">Delete Item</span>
                <p className="fs-6">
                  Are you sure you want to delete the item?
                </p>
              </h1>
              <button
                onClick={() => {
                  bsModalRef.current.hide();
                  setShowDeleteItemForm(false);
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
                  value={currentItem?.name}
                  disabled={true}
                  onChange={(e) => {
                    setCurrentItem({
                      ...currentItem,
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
                  value={currentItem?.price}
                  disabled={true}
                  onChange={(e) => {
                    setCurrentItem({
                      ...currentItem,
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
                  value={currentItem?.quantity}
                  disabled={true}
                  onChange={(e) => {
                    setCurrentItem({
                      ...currentItem,
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
                  disabled={true}
                ></input>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => {
                  bsModalRef.current.hide();
                  setShowDeleteItemForm(false);
                }}
                type="button"
                className="btn btn-info"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-danger">
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeleteItemForm;
