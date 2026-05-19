import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import EditOrderDetailForm from "../../components/orders/EditOrderDetailForm";
import DeleteOrderDetailForm from "../../components/orders/DeleteOrderDetailForm";
import { formatCurrency } from "../../utilities/currency";

function Transactions() {
  const { transactions: transactionCtx } = useContext(TransactionContext);

  const transactions =
    JSON.parse(localStorage.getItem("transactions")) || transactionCtx;

  function getTotalTransactionPrice() {
    return Number(
      transactions.reduce(
        (prev, current) =>
          Number(prev) + Number(current.quantity) * Number(current.price),
        0,
      ),
    );
  }

  return (
    <div className="container-fluid flex-fill d-flex flex-column py-3">
      <div className="row flex-fill">
        <div className="col-12 d-flex flex-column">
          <div className="card bg-primary-subtle flex-fill">
            <div className="card-header bg-black">
              <h4 className="card-title d-flex justify-content-between align-items-center mb-0">
                <span>Transaction Overview</span>
                <span className="fs-6">{`Date: ${new Date().toLocaleDateString()}`}</span>
              </h4>
            </div>
            <div className="card-body bg-secondary d-flex flex-column flex-fill">
              <form className="flex-fill d-flex flex-column">
                <div className="row">
                  <div className="col-auto">
                    <label
                      htmlFor="inputPassword4"
                      className="form-label form-label-sm m-0"
                    >
                      From:
                    </label>

                    <input
                      className="form-control fw-bold"
                      disabled
                      value={`${new Date().toLocaleDateString()}`}
                    />
                  </div>
                  <div className="col-auto">
                    <label
                      htmlFor="inputPassword4"
                      className="form-label form-label-sm m-0"
                    >
                      To:
                    </label>

                    <input
                      className="form-control fw-bold"
                      disabled
                      value={`${new Date().toLocaleDateString()}`}
                    />
                  </div>
                  <div className="col-auto ms-md-auto">
                    <label className="form-label form-label-sm m-0">
                      Total Gross Amount:
                    </label>

                    <input
                      className="form-control fw-bold"
                      disabled
                      value={formatCurrency(
                        getTotalTransactionPrice(),
                        "PHP",
                        "en-PH",
                      )}
                    />
                  </div>
                  <div className="col-auto">
                    <label htmlFor="inputEmail4" className="form-label m-0">
                      Total Net Amount:
                    </label>

                    <input
                      className="form-control fw-bold"
                      disabled
                      value={formatCurrency(
                        getTotalTransactionPrice() * 0.15,
                        "PHP",
                        "en-PH",
                      )}
                    />
                  </div>
                </div>
                <hr />
                <div className="row flex-fill">
                  <div className="overflow-auto" style={{ maxHeight: "340px" }}>
                    <table className="table table-bordered table-hover table-striped small text-truncate">
                      <thead>
                        <tr>
                          <th scope="col">Order #</th>
                          <th scope="col">Product</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Total Price</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((item, index) => (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? "table-secondary" : ""}
                          >
                            {/* <th scope="row">{item.id}</th> */}
                            <td>{`Order-${item.id}`}</td>
                            <td
                              className="text-truncate"
                              style={{ maxWidth: "80px" }}
                            >
                              {item.name}
                            </td>
                            <td>{item.quantity}</td>
                            <td>
                              {(item.quantity * item.price).toLocaleString()}
                            </td>
                            <td>
                              <a className="btn btn-outline-danger me-3 btn-sm mb-1 mb-lg-0">
                                Delete
                              </a>
                              <a className="btn btn-outline-success me-3 btn-sm mb-1 mb-lg-0">
                                Edit
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-12 d-flex flex-sm-row flex-column justify-content-end align-items-center gap-md-0 gap-3">
                    <button type="submit" className="btn btn-success btn-sm">
                      <span
                        className="fw-bold"
                        // style={{ fontSize: "0.75rem" }}
                      >
                        Export to CSV
                      </span>
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

export default Transactions;
