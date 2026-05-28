import { useContext } from "react";
import BarChart from "../../components/dashboard/BarChart";
import { TransactionContext } from "../../context/TransactionContext";
import { ItemContext } from "../../context/ItemContext";
import { eListam } from "../../utilities/elistam";

function Dashboard() {
  const { transactionCtx } = useContext(TransactionContext);
  const { items } = useContext(ItemContext);

  const cards = [
    {
      icon: "bi bi-calendar-check-fill",
      value: eListam.utils.formatCurrencyToPHP(
        eListam.helpers.getTotalTransactionPriceToday(transactionCtx),
      ),
      label: "Today",
      border: "border-primary",
      color: "text-primary",
    },
    {
      icon: "bi bi-boxes",
      value: eListam.utils.formatCurrencyToPHP(
        eListam.helpers.getTotalStockAmount(items),
      ),
      label: "Stocks",
      border: "border-success",
      color: "text-success",
    },
    {
      icon: "bi bi-piggy-bank-fill",
      value: eListam.utils.formatCurrencyToPHP(
        eListam.helpers.getTotalProfit(items),
      ),
      label: "Profit",
      border: "border-warning",
      color: "text-warning",
    },
  ];

  return (
    <div
      className="container-fluid"
      // style={{
      //   background: "linear-gradient(135deg, #0A2540, #1A3A60, #32607F)",
      // }}
    >
      <div className="row px-3 mt-2">
        <div className="alert alert-success bg-success-subtle border border-success text-dark d-md-flex align-items-center">
          <i className="bi bi-check-circle-fill text-success me-1"></i>
          <span className="me-1">
            Everything is looking good. Keep up the good work!
          </span>
          <i className="bi bi-hand-thumbs-up-fill text-warning"></i>
        </div>
      </div>
      <div className="row px-3 pb-4">
        <div className="col-md-8 col-12">
          <div className="row justify-content-between ">
            {cards.map((card, index) => (
              <div key={index} className="col-md-3 col-12 p-0">
                <div
                  className={`card mb-3 border-0 border-5 border-top ${card.border} bg-white text-dark shadow-sm`}
                >
                  <div className="row g-0">
                    <div className="col-lg-4 col-md-12 col-4 d-flex align-items-center justify-content-center">
                      <i
                        className={`${card.icon} pt-2 pb-0 fs-2 ${card.color}`}
                      ></i>
                    </div>
                    <div className="col-lg-8 col-md-12 col-4">
                      <div className="card-body d-flex flex-column align-items-center justify-content-center text-nowrap">
                        <p className="card-title fs-4">{card.label}</p>
                        <h5 className="card-text fw-bold">{card.value}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Bar Chart */}
          <div
            className="row mb-3 mb-md-0 bg-white border border-dark border-2 rounded-3"
            style={{ height: "350px" }}
          >
            <BarChart />
          </div>
        </div>
        <div className="col-md-4 col-12 d-flex justify-content-end pe-0 ps-0 ps-md-3">
          <div className="card flex-fill">
            <div className="card-header bg-light d-flex align-items-center justify-content-between">
              <h5 className="mb-0 fw-semibold text-dark">🔔 Stock Alerts</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Item #</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Item-1</td>
                      <td>Quantity is below 10 units</td>
                    </tr>
                    <tr>
                      <td>Item-2</td>
                      <td>Expires in 6 months</td>
                    </tr>
                    <tr>
                      <td>Item-3</td>
                      <td>Out of Stock</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
