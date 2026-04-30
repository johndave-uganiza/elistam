function Dashboard() {
  const cards = [
    {
      icon: "💵",
      value: "PHP 1,000.00",
      label: "Sales Today",
      bg: "bg-white text-dark",
    },
    {
      icon: "📦",
      value: "PHP 1,000.00",
      label: "Stocks Amount",
      bg: "bg-success text-white",
    },
    {
      icon: "💶",
      value: "PHP 1,000.00",
      label: "Total Profit",
      bg: "bg-warning text-dark",
    },
  ];

  return (
    <div
      className="container-fluid flex-grow-1 py-5"
      style={{
        background: "linear-gradient(135deg, #0A2540, #1A3A60, #32607F)",
      }}
    >
      {/* Summary Cards */}
      <div className="row g-4 justify-content-center mb-5">
        {cards.map((card, index) => (
          <div key={index} className="col-md-4 col-lg-3">
            <div className="card shadow-sm border-0 text-center h-100">
              <div className={`card-body rounded ${card.bg}`}>
                <div className="fs-1 mb-2">{card.icon}</div>
                <h3 className="fw-bold">{card.value}</h3>
                <hr />
                <p className="mb-0 fw-medium text-muted">{card.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stock Alerts */}
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-light d-flex align-items-center justify-content-between">
              <h5 className="mb-0 fw-semibold">🔔 Stock Alerts</h5>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
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
