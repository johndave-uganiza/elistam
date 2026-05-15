import BarChart from "../../components/dashboard/BarChart";

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
      className="container-fluid"
      style={{
        background: "linear-gradient(135deg, #0A2540, #1A3A60, #32607F)",
      }}
    >
      <div className="row mb-2 p-3">
        <div className="p-0 bg-light border-start border-5 border-warning">
          <h3 className="ms-2 m-0">Dashboard</h3>
        </div>
      </div>
      <div className="row px-3 pb-4">
        <div className="col-md-8 col-12">
          <div className="row justify-content-between ">
            {cards.map((card, index) => (
              <div key={index} className="col-md-3 col-12 p-0">
                <div className="card mb-3 border-0 border-4 border-start border-success">
                  <div className="row g-0">
                    <div className="col-lg-4 col-md-12 col-4 d-flex align-items-center justify-content-center">
                      <h2>{card.icon}</h2>
                    </div>
                    <div className="col-lg-8 col-md-12 col-4">
                      <div className="card-body d-flex flex-column align-items-center justify-content-center text-nowrap">
                        <p className="card-title">{card.label}</p>
                        <h5 className="card-text">{card.value}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Bar Chart */}
          <div
            className="row mb-3 mb-md-0 bg-light rounded-3"
            style={{ height: "350px" }}
          >
            <BarChart />
          </div>
        </div>
        <div className="col-md-4 col-12 d-flex justify-content-end pe-0">
          <div className="card flex-fill">
            <div className="card-header bg-light d-flex align-items-center justify-content-between">
              <h5 className="mb-0 fw-semibold">🔔 Stock Alerts</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
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
    </div>
  );
}

export default Dashboard;
