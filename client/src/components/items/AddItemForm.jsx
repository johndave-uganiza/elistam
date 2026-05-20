import { useContext, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import { ItemContext } from "../../context/ItemContext";

function AddItemForm({ showAddItemForm, setShowAddItemForm }) {
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);
  const { items, setItems } = useContext(ItemContext);

  useEffect(() => {
    if (!modalRef.current) return;

    if (!bsModalRef.current) {
      bsModalRef.current = new Modal(modalRef.current, { backdrop: "static" });
    }

    if (showAddItemForm) {
      bsModalRef.current.show();
    } else {
      bsModalRef.current.hide();
    }
  }, [showAddItemForm, setShowAddItemForm]);

  function hanldeAddItem(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const expirationDate = new Date(
      formData.get("expirationDate"),
    ).toLocaleDateString("en-US");
    const image = formData.get("image");

    const newItems = [
      ...items,
      {
        name: name,
        price: price,
        quantity: quantity,
        expirationDate: expirationDate,
        image: URL.createObjectURL(image),
      },
    ];

    setItems(newItems);

    localStorage.setItem("items", JSON.stringify(newItems));

    bsModalRef.current.hide();
    setShowAddItemForm(false);
  }

  return (
    <div ref={modalRef} className="modal fade" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Add Item
            </h1>
            <button
              onClick={() => {
                bsModalRef.current.hide();
                setShowAddItemForm(false);
              }}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={hanldeAddItem} id="addItemForm">
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                  name="name"
                  className="form-control"
                  type="text"
                  placeholder="Item Name"
                  required
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Price:</label>
                <input
                  name="price"
                  className="form-control"
                  type="number"
                  placeholder="Price"
                  required
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity:</label>
                <input
                  name="quantity"
                  className="form-control"
                  type="number"
                  placeholder="Quantity"
                  required
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Expiration Date:</label>
                <input
                  name="expirationDate"
                  className="form-control"
                  type="date"
                  placeholder="Expiration Date"
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Image:</label>
                <input type="file" className="form-control" name="image" />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                bsModalRef.current.hide();
                setShowAddItemForm(false);
              }}
              type="button"
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              form="addItemForm"
              type="submit"
              className="btn btn-primary"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItemForm;
