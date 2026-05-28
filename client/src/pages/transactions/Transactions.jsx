import { useContext, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import EditOrderDetailForm from "../../components/orders/EditOrderDetailForm";
import DeleteOrderDetailForm from "../../components/orders/DeleteOrderDetailForm";
import { eListam } from "../../utilities/elistam";
import DeleteTransactionForm from "../../components/transactions/DeleteTransactionForm";

function Transactions() {
  const { transactionCtx, setTransactionCtx } = useContext(TransactionContext);
  const [showDeleteTransactionForm, setShowDeleteTransactionForm] =
    useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  function getTotalTransactionPrice() {
    return Number(
      transactionCtx.reduce(
        (prev, current) => Number(prev) + Number(current.totalPrice),
        0,
      ),
    );
  }

  function handleDeleteTransactionDetail(current) {
    setCurrentTransaction(current);
    setShowDeleteTransactionForm(true);
  }

  function handleConfirmDeleteTransaction(e, current) {
    e.preventDefault();
    const updatedTransactions = transactionCtx.filter(
      (transaction) => transaction.id !== current.id,
    );

    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    setTransactionCtx(updatedTransactions);
    setShowDeleteTransactionForm(false);
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
                  {/* <div className="col-auto">
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
                  </div> */}
                  <div className="col-auto ms-md-auto">
                    <label className="form-label form-label-sm m-0">
                      Total Gross Amount:
                    </label>

                    <input
                      className="form-control fw-bold"
                      disabled
                      value={eListam.utils.formatCurrencyToPHP(
                        getTotalTransactionPrice(),
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
                      value={eListam.utils.formatCurrencyToPHP(
                        getTotalTransactionPrice() * 0.15,
                      )}
                    />
                  </div>
                </div>
                <hr />
                <div className="row flex-fill">
                  <div className="overflow-auto" style={{ maxHeight: "340px" }}>
                    <table className="table table-bordered table-hover table-striped small">
                      <thead>
                        <tr>
                          <th scope="col">Transact Number</th>
                          <th scope="col">Order Number</th>
                          <th scope="col">Date</th>
                          <th scope="col">Total</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactionCtx.map((item, index) => (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? "table-secondary" : ""}
                          >
                            {/* <th scope="row">{item.id}</th> */}
                            <td className="text-wrap">{`T - ${item.id}`}</td>
                            <td className="text-wrap">{`O - ${item.id}`}</td>
                            <td className="text-wrap">{item.date}</td>
                            <td>
                              {eListam.utils.formatCurrencyToPHP(
                                item.totalPrice,
                              )}
                            </td>
                            <td>
                              <a
                                className="btn btn-outline-danger me-1 btn-sm mb-1 mb-lg-0"
                                onClick={() =>
                                  handleDeleteTransactionDetail(item)
                                }
                              >
                                <i className="bi bi-trash3-fill me-1"></i>
                                <span className=" d-none d-md-inline">
                                  Delete
                                </span>
                              </a>
                              <a className="btn btn-outline-success me-1 btn-sm mb-1 mb-lg-0 disabled">
                                <i className="bi bi-list me-1"></i>
                                <span className="d-none d-md-inline">
                                  View Details
                                </span>
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
                    <button
                      type="submit"
                      className="btn btn-info btn-sm disabled"
                    >
                      <span
                        className="fw-bold"
                        // style={{ fontSize: "0.75rem" }}
                      >
                        Generate Report
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <DeleteTransactionForm
        showDeleteTransactionForm={showDeleteTransactionForm}
        setShowDeleteTransactionForm={setShowDeleteTransactionForm}
        currentTransaction={currentTransaction}
        handleConfirmDeleteTransaction={handleConfirmDeleteTransaction}
      />
    </div>
  );
}

export default Transactions;
