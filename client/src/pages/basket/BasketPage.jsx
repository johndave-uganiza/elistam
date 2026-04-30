import { useContext } from "react";
import { BasketContext } from "../../context/BasketContext";

function BasketPage() {
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
        <h3>Basket Items</h3>
        <div className="col-12">
          <div className="card bg-primary-subtle" style={{ height: "440px" }}>
            <div className="card-header bg-black">
              <h4 className="card-title d-flex justify-content-between align-items-center">
                <span>Basket Summary</span>
                <span className="fs-6 align-self-center">
                  Date: {new Date().toLocaleDateString("en-US")}
                </span>
              </h4>
            </div>
            <div className="card-body bg-secondary">
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    Total Price
                  </label>
                  <input
                    className="form-control form-control fw-bold"
                    disabled
                    value={`$${getTotalBasketPrice()}`}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">
                    Total Quantity
                  </label>
                  <input className="form-control form-control" disabled />
                </div>
                <div
                  className="overflow-scroll overflow-x-hidden"
                  style={{ height: "180px" }}
                >
                  <table class="table">
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
                        <td>
                          {/* <img
                            src={basketItems[0].thumbnail}
                            className="img-fluid rounded-start"
                            style={{ height: "32px" }}
                            alt="..."
                          /> */}
                          Product-1
                        </td>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketPage;
