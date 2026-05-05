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
    <div className="container-fluid my-3 px-sm-5">
      <div className="row">
        <h3>Orders</h3>
        <div className="col-12">
          <div className="card bg-primary-subtle" style={{ height: "440px" }}>
            <div className="card-header bg-black">
              <h4 className="card-title d-flex justify-content-between align-items-center">
                <span>Checkout Summary</span>
                <span className="fs-6 align-self-center">
                  Date: {new Date().toLocaleDateString("en-US")}
                </span>
              </h4>
            </div>
            <div className="card-body bg-secondary">
              <form>
                <div className="row mb-3 ">
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
                <div className="row mb-3">
                  <div
                    className="overflow-scroll overflow-x-hidden"
                    style={{ height: "240px" }}
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Price</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Product-1</td>
                          <td>11</td>
                          <td>11</td>
                          <td>111</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Product-2</td>
                          <td>22</td>
                          <td>22</td>
                          <td>222</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Product-3</td>
                          <td>33</td>
                          <td>33</td>
                          <td>333</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Product-4</td>
                          <td>44</td>
                          <td>44</td>
                          <td>444</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Product-5</td>
                          <td>55</td>
                          <td>55</td>
                          <td>555</td>
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
