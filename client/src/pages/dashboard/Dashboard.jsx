import PieChart from "../../components/PieChart";

function Dashboard() {
  const cards = [
    {
      icon: "💵",
      value: "$ 1,000.00",
      label: "Today",
      bg: "bg-white text-dark",
    },
    {
      icon: "📦",
      value: "$ 1,000.00",
      label: "Stocks",
      bg: "bg-success text-white",
    },
    {
      icon: "💶",
      value: "$ 1,000.00",
      label: "Profit",
      bg: "bg-warning text-dark",
    },
  ];

  return (
    <div
      className="flex-fill container-fluid"
      style={{
        background: "linear-gradient(135deg, #0A2540, #1A3A60, #32607F)",
      }}
    >
      <div className="row d-flex justify-content-center align-items-center p-5">
        {/* Summary Cards */}
        <div className="col-8 p-5">
          <div className="row g-3 justify-content-between mb-3">
            {cards.map((card, index) => (
              <div key={index} className="col-md-4 col-lg-3 p-0">
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                      <h2>{card.icon}</h2>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body d-flex flex-column align-items-center justify-content-center">
                        <p className="card-title">{card.label}</p>
                        <h5 className="card-text">{card.value}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stock Alerts */}
          <div className="row">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-light d-flex align-items-center justify-content-between">
                <h5 className="mb-0 fw-semibold">🔔 Stock Alerts</h5>
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover w-100">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th className="text-end">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Product-1</td>
                        <td className="text-end">1</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Product-2</td>
                        <td className="text-end">2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-4">
          <PieChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
