import { useContext, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import { ProductsContext } from "../context/ProductsContext";

function AddProductForm({ showAddProductForm, setShowAddProductForm }) {
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);
  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    if (!modalRef.current) return;

    if (!bsModalRef.current) {
      bsModalRef.current = new Modal(modalRef.current, { backdrop: "static" });
    }

    if (showAddProductForm) {
      bsModalRef.current.show();
    } else {
      bsModalRef.current.hide();
    }
  }, [showAddProductForm, setShowAddProductForm]);

  function handleAddProduct(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const expirationDate = new Date(
      formData.get("expirationDate"),
    ).toLocaleDateString("en-US");

    const newProducts = [
      ...products,
      {
        title: name,
        price: price,
        stock: quantity,
        expirationDate: expirationDate,
      },
    ];

    setProducts(newProducts);

    localStorage.setItem("products", JSON.stringify(newProducts));

    bsModalRef.current.hide();
    setShowAddProductForm(false);
  }

  return (
    <div ref={modalRef} className="modal fade" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Add Product
            </h1>
            <button
              onClick={() => {
                bsModalRef.current.hide();
                setShowAddProductForm(false);
              }}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddProduct} id="addProductForm">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  name="name"
                  className="form-control"
                  type="text"
                  placeholder="Product Name"
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  name="price"
                  className="form-control"
                  type="number"
                  placeholder="Price"
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  name="quantity"
                  className="form-control"
                  type="number"
                  placeholder="Quantity"
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Expiration Date</label>
                <input
                  name="expirationDate"
                  className="form-control"
                  type="date"
                  placeholder="Expiration Date"
                ></input>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                bsModalRef.current.hide();
                setShowAddProductForm(false);
              }}
              type="button"
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              form="addProductForm"
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

export default AddProductForm;
