import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import OrderTable from "./OrderTable";

function OrderModal({
  onClose,
  isEditing,
  onSubmit,
  onChange,
  formData,
  isLoading,
}) {
  const { getOrder } = useContext(OrderContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getOrder();
      setOrder(result.data[0]);
      // debugger;
    };

    fetchOrder();
  }, [getOrder]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
              {order ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex-fill d-flex flex-column"
                  style={{ minHeight: "400px" }}
                >
                  <div className="row">
                    <div className="col-auto ms-md-auto"></div>
                  </div>

                  <div className="row flex-fill">
                    <OrderTable order={order} />
                  </div>
                  <hr />
                  <div className="col-md-4 col-sm-5 col-6 ms-auto">
                    <div className="d-flex align-items-center gap-2">
                      <label className="fw-medium">Total:</label>
                      <input
                        className="form-control bg-white fw-bold"
                        style={{ minWidth: "100px" }}
                        disabled
                        placeholder="$0.00"
                        // value={eListam.utils.formatCurrencyToPHP(
                        //   getTotalOrderPrice(),
                        // )}
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <div
                  className="card d-flex justify-content-center align-items-center text-secondary"
                  style={{ minHeight: "400px" }}
                >
                  <h3>There are no pending orders.</h3>
                  <i
                    className="bi bi-bag text-secondary"
                    style={{ fontSize: "7rem" }}
                  ></i>
                </div>
              )}
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
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
