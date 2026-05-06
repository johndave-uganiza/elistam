import { useContext } from "react";
import { BasketContext } from "../../context/BasketContext";

function Orders() {
  const { basketItems } = useContext(BasketContext);

  function getTotalBasketPrice() {
    const total = basketItems.reduce(
      (prev, current) => prev + current.quantity * current.price,
      0,
    );

    return total.toFixed(2);
  }

  return (
    <div className="container-fluid flex-fill d-flex flex-column">
      <div className="row p-3">
        <div className="p-0 d-flex justify-content-between align-items-center">
          <h3 className="">Orders</h3>
        </div>
      </div>
      <div className="row flex-fill mb-3">
        <div className="col-12 d-flex flex-column">
          <div className="card bg-primary-subtle flex-fill">
            <div className="card-header bg-black">
              <h4 className="card-title d-flex justify-content-between align-items-center mb-0">
                <span>Checkout Summary</span>
                <span className="fs-6 align-self-center">
                  Date: {new Date().toLocaleDateString("en-US")}
                </span>
              </h4>
            </div>
            <div className="card-body bg-secondary d-flex flex-column flex-fill">
              <form className="flex-fill d-flex flex-column">
                <div className="row mb-3">
                  <div className="col-auto">
                    <label
                      htmlFor="inputPassword4"
                      className="form-label form-label-sm m-0"
                    >
                      Date:
                    </label>

                    <input className="form-control form-control-sm" disabled />
                  </div>
                  <div className="col-auto ms-md-auto">
                    <label
                      htmlFor="inputPassword4"
                      className="form-label form-label-sm m-0"
                    >
                      Total Qty:
                    </label>

                    <input className="form-control form-control-sm" disabled />
                  </div>
                  <div className="col-auto">
                    <label htmlFor="inputEmail4" className="form-label m-0">
                      Total Price:
                    </label>

                    <input
                      className="form-control form-control-sm"
                      disabled
                      value={`$${getTotalBasketPrice()}`}
                    />
                  </div>
                </div>
                <div className="row flex-fill">
                  <div
                    className="overflow-scroll overflow-x-hidden"
                    style={{ maxHeight: "290px" }}
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Price</th>
                          <th scope="col">Total</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Product-1</td>
                          <td>11</td>
                          <td>11</td>
                          <td>111</td>
                          <td>
                            <button className="btn btn-info btn-sm me-2">
                              Edit Quantity
                            </button>
                            <button className="btn btn-danger btn-sm">
                              Remove
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <input
                          className="form-check-input bg-warning"
                          type="radio"
                          id="gridCheck"
                          name="paymentType"
                          checked={true}
                        />
                        <label className="form-check-label" htmlFor="gridCheck">
                          Regular
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gridCheck"
                          name="paymentType"
                          disabled
                        />
                        <label className="form-check-label" htmlFor="gridCheck">
                          Full Credit
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gridCheck"
                          name="paymentType"
                          disabled
                        />
                        <label className="form-check-label" htmlFor="gridCheck">
                          Partial Credit
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success fw-bold">
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
