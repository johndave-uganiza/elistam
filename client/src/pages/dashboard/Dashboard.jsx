import { useContext, useEffect, useState } from "react";
import BarChart from "../../components/dashboard/BarChart";
import { DashboardContext } from "../../context/DashboardContext";
import helperFunctions from "@/utilities/helperFunctions";

const stockAlertPresentations = {
  LowStock: {
    color: "warning",
    icon: "bi-exclamation-triangle-fill",
    label: "Low stock",
  },
  OutOfStock: {
    color: "info",
    icon: "bi-x-lg",
    label: "Out of stock",
  },
  Expired: {
    color: "danger",
    icon: "bi-calendar-x-fill",
    label: "Expired",
  },
  ExpiringSoon: {
    color: "danger",
    icon: "bi-calendar-event-fill",
    label: "Expiring soon",
  },
};

function getStockAlertDetails(alert, label) {
  const details = [label, `${alert.stock} in stock`];

  if (alert.expirationDate) {
    const expirationLabel =
      alert.alertType === "Expired" ? "Expired" : "Expires";
    details.push(
      `${expirationLabel} ${helperFunctions.formatDate(alert.expirationDate)}`,
    );
  }

  return details.join(" · ");
}

function Dashboard() {
  const [metrics, setMetrics] = useState({
    revenue: 0,
    cogs: 0,
    grossProfit: 0,
    netProfit: 0,
    operatingExpenses: 0,
    stockAmount: 0,
  });
  const [monthlyFinancials, setMonthlyFinancials] = useState([]);
  const [stockAlerts, setStockAlerts] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  const { getDashboardMetrics, isLoading } = useContext(DashboardContext);

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        const response = await getDashboardMetrics();

        const data = response?.data ?? response ?? {};

        setMetrics({
          revenue: Number(data.revenue) || 0,
          cogs: Number(data.cogs) || 0,
          grossProfit: Number(data.grossProfit) || 0,
          netProfit: Number(data.netProfit) || 0,
          operatingExpenses: Number(data.operatingExpenses) || 0,
          stockAmount: Number(data.stockAmount) || 0,
        });
        setMonthlyFinancials(data.monthlyFinancials ?? []);
        setStockAlerts(data.stockAlerts ?? []);
        setYear(Number(data.year) || new Date().getFullYear());
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardMetrics();
  }, [getDashboardMetrics]);

  const cards = [
    {
      icon: "bi bi-graph-up-arrow",
      label: "Revenue",
      value: helperFunctions.formatCurrencyToPHP(metrics.revenue),
      description: "Total sales",
      border: "border-success",
      color: "text-success",
      bg: "bg-success-subtle",
    },
    {
      icon: "bi bi-box-seam",
      label: "COGS",
      value: helperFunctions.formatCurrencyToPHP(metrics.cogs),
      description: "Cost of goods sold",
      border: "border-warning",
      color: "text-warning",
      bg: "bg-warning-subtle",
    },
    {
      icon: "bi bi-cash-stack",
      label: "Gross Profit",
      value: helperFunctions.formatCurrencyToPHP(metrics.grossProfit),
      description: "Revenue − COGS",
      border: "border-primary",
      color: "text-primary",
      bg: "bg-primary-subtle",
    },
    {
      icon: "bi bi-wallet2",
      label: "Net Profit",
      value: helperFunctions.formatCurrencyToPHP(metrics.netProfit),
      description: "After operating expenses",
      border: metrics.netProfit >= 0 ? "border-success" : "border-danger",
      color: metrics.netProfit >= 0 ? "text-success" : "text-danger",
      bg: metrics.netProfit >= 0 ? "bg-success-subtle" : "bg-danger-subtle",
    },
  ];

  return (
    <div className="container px-3 px-md-4 py-2">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
        <div>
          <h3 className="fw-bold mb-0">Dashboard</h3>

          <p className="text-muted small mb-0">
            Financial and operational overview.
          </p>
        </div>

        <div className="mt-2 mt-md-0">
          <div
            className={`alert ${stockAlerts.length ? "alert-warning" : "alert-success"} border-0 shadow-sm mb-0 py-1 px-3 d-flex align-items-center`}
          >
            <i
              className={`bi ${stockAlerts.length ? "bi-exclamation-triangle-fill" : "bi-check-circle-fill"} me-2`}
            ></i>
            <span className="small fw-medium">
              {stockAlerts.length
                ? `${stockAlerts.length} item${stockAlerts.length === 1 ? "" : "s"} need attention`
                : "Everything is looking good!"}
            </span>
          </div>
        </div>
      </div>

      {/* Financial KPI Cards */}
      <div className="row g-3 mb-3">
        {cards.map((card) => (
          <div key={card.label} className="col-12 col-sm-6 col-xl-3">
            <div
              className={`card h-100 border-0 border-start border-4 ${card.border} shadow-sm`}
            >
              <div className="card-body p-3">
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <div className="min-width-0">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="text-muted small fw-semibold">
                        {card.label}
                      </span>
                    </div>

                    <div
                      className="fw-bold text-dark text-truncate"
                      style={{
                        fontSize: "1.2rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {card.value}
                    </div>

                    <small className="text-muted">{card.description}</small>
                  </div>

                  <div
                    className={`rounded-3 ${card.bg} d-flex align-items-center justify-content-center flex-shrink-0`}
                    style={{
                      width: "44px",
                      height: "44px",
                    }}
                  >
                    <i
                      className={`${card.icon} ${card.color}`}
                      style={{ fontSize: "1.1rem" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Financial Overview */}
      <div className="row g-3 align-items-stretch">
        {/* Financial Chart — 3 KPI card widths */}
        <div className="col-12 col-xl-9">
          <div className="card border-0 shadow-sm h-100 overflow-hidden">
            <div className="card-header bg-white border-0 px-3 px-md-4 pt-3 pb-2">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="min-width-0">
                  <h6 className="fw-bold mb-1">Financial Overview</h6>

                  <p className="text-muted small mb-0">
                    Monthly revenue, COGS, and operating expenses for {year}
                  </p>
                </div>

                <div
                  className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <i className="bi bi-bar-chart-fill"></i>
                </div>
              </div>
            </div>

            <div className="card-body px-2 px-md-3 pt-2 pb-3">
              <div
                className="w-100"
                style={{
                  height: "38vh",
                }}
              >
                <BarChart monthlyFinancials={monthlyFinancials} />
              </div>
            </div>
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="col-12 col-xl-3">
          <div className="card border-0 shadow-sm h-100 overflow-hidden">
            <div className="card-header bg-white border-0 px-3 px-md-4 pt-3 pb-2">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="min-width-0">
                  <h6 className="fw-bold mb-1">Stock Alerts</h6>

                  <p className="text-muted small mb-0">
                    Low stock, out of stock, and expiration alerts
                  </p>
                </div>
              </div>
            </div>

            <div className="card-body p-3 px-md-4">
              {isLoading ? (
                <div className="text-center py-4">
                  <span
                    className="spinner-border spinner-border-sm text-primary"
                    role="status"
                  />
                  <span className="visually-hidden">Loading stock alerts</span>
                </div>
              ) : stockAlerts.length > 0 ? (
                <div
                  className="d-flex flex-column gap-2 overflow-auto"
                  style={{
                    maxHeight: "264px",
                    overflowX: "hidden",
                  }}
                >
                  {stockAlerts.map((alert) => {
                    const presentation =
                      stockAlertPresentations[alert.alertType] ??
                      stockAlertPresentations.ExpiringSoon;

                    return (
                      <div
                        key={alert.itemId}
                        className="d-flex align-items-center p-2 rounded-3 bg-light overflow-hidden flex-shrink-0"
                        style={{ height: "60px" }}
                      >
                        <div
                          className={`rounded-circle bg-${presentation.color}-subtle text-${presentation.color} d-flex align-items-center justify-content-center flex-shrink-0`}
                          style={{
                            width: "38px",
                            height: "38px",
                          }}
                        >
                          <i className={`bi ${presentation.icon} small`}></i>
                        </div>

                        <div className="ms-2 min-width-0">
                          <div className="fw-semibold text-dark small text-truncate">
                            {alert.itemName}
                          </div>

                          <div className="text-muted small text-truncate">
                            {getStockAlertDetails(alert, presentation.label)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="bi bi-check-circle text-success fs-3"></i>

                  <p className="fw-semibold mt-2 mb-1 small">
                    All stocks look good
                  </p>

                  <p className="text-muted small mb-0">
                    No items match the stock alert criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
