import { useContext, useMemo } from "react";
import BarChart from "../../components/dashboard/BarChart";
import { TransactionContext } from "../../context/TransactionContext";
import { ItemContext } from "../../context/ItemContext";
import eListam from "@/utilities/elistam";

function Dashboard() {
  const { transactionCtx = [] } = useContext(TransactionContext);
  const { items = [] } = useContext(ItemContext);

  /*
   * Financial metrics
   *
   * Revenue
   *   ↓
   * COGS
   *   ↓
   * Gross Profit
   *   ↓
   * Opex
   *   ↓
   * Net Profit
   */
  const metrics = useMemo(() => {
    const revenue =
      eListam.helpers.getTotalTransactionPriceToday(transactionCtx);

    /*
     * Replace these with your actual financial helpers
     * when they are available.
     */
    const cogs = eListam.helpers.getTotalCOGS?.(transactionCtx) || 0;

    const opex = eListam.helpers.getTotalOpex?.() || 0;

    const grossProfit = revenue - cogs;

    const netProfit = grossProfit - opex;

    const stockValue = eListam.helpers.getTotalStockAmount(items);

    return {
      revenue,
      cogs,
      opex,
      grossProfit,
      netProfit,
      stockValue,
    };
  }, [transactionCtx, items]);

  const cards = [
    {
      icon: "bi bi-graph-up-arrow",
      label: "Revenue",
      value: eListam.utils.formatCurrencyToPHP(metrics.revenue),
      description: "Total sales",
      border: "border-success",
      color: "text-success",
      bg: "bg-success-subtle",
    },

    {
      icon: "bi bi-box-seam",
      label: "COGS",
      value: eListam.utils.formatCurrencyToPHP(metrics.cogs),
      description: "Cost of goods sold",
      border: "border-warning",
      color: "text-warning",
      bg: "bg-warning-subtle",
    },

    {
      icon: "bi bi-cash-stack",
      label: "Gross Profit",
      value: eListam.utils.formatCurrencyToPHP(metrics.grossProfit),
      description: "Revenue − COGS",
      border: "border-primary",
      color: "text-primary",
      bg: "bg-primary-subtle",
    },

    {
      icon: "bi bi-wallet2",
      label: "Net Profit",
      value: eListam.utils.formatCurrencyToPHP(metrics.netProfit),
      description: "After operating expenses",
      border: metrics.netProfit >= 0 ? "border-success" : "border-danger",
      color: metrics.netProfit >= 0 ? "text-success" : "text-danger",
      bg: metrics.netProfit >= 0 ? "bg-success-subtle" : "bg-danger-subtle",
    },
  ];

  const stockAlerts = [
    {
      item: "Item-1",
      status: "Quantity is below 10 units",
      type: "warning",
      icon: "bi-exclamation-triangle-fill",
    },
    {
      item: "Item-2",
      status: "Expires in 6 months",
      type: "info",
      icon: "bi-calendar-event-fill",
    },
    {
      item: "Item-3",
      status: "Out of stock",
      type: "danger",
      icon: "bi-x-circle-fill",
    },
  ];

  return (
    <div className="container px-3 px-md-4 py-2">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
        <div>
          <h3 className="fw-bold mb-0">Dashboard</h3>

          <p className="text-muted small mb-0">
            Financial and operational overview of your business.
          </p>
        </div>

        <div className="mt-2 mt-md-0">
          <div className="alert alert-success border-0 shadow-sm mb-0 py-1 px-3 d-flex align-items-center">
            <i className="bi bi-check-circle-fill me-2"></i>

            <span className="small fw-medium">Everything is looking good!</span>
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
                      style={{
                        fontSize: "1.1rem",
                      }}
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
                    Revenue, COGS and operating expenses
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
                <BarChart />
              </div>
            </div>
          </div>
        </div>

        {/* Stock Alerts — 1 KPI card width */}
        <div className="col-12 col-xl-3">
          <div className="card border-0 shadow-sm h-100 overflow-hidden">
            <div className="card-header bg-white border-0 px-3 px-md-4 pt-3 pb-2">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="min-width-0">
                  <h6 className="fw-bold mb-1">Stock Alerts</h6>

                  <p className="text-muted small mb-0">
                    Items needing attention
                  </p>
                </div>

                <span
                  className={`badge rounded-pill ${
                    stockAlerts.length > 0 ? "bg-danger" : "bg-success"
                  }`}
                >
                  {stockAlerts.length}
                </span>
              </div>
            </div>

            <div className="card-body p-3 px-md-4">
              {stockAlerts.length > 0 ? (
                <div className="d-flex flex-column gap-2">
                  {stockAlerts.map((alert) => (
                    <div
                      key={alert.item}
                      className="d-flex align-items-center p-2 rounded-3 bg-light"
                    >
                      <div
                        className={`rounded-circle bg-${alert.type}-subtle text-${alert.type} d-flex align-items-center justify-content-center flex-shrink-0`}
                        style={{
                          width: "38px",
                          height: "38px",
                        }}
                      >
                        <i className={`bi ${alert.icon} small`}></i>
                      </div>

                      <div className="ms-2 min-width-0">
                        <div className="fw-semibold text-dark small">
                          {alert.item}
                        </div>

                        <div className="text-muted small text-truncate">
                          {alert.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="bi bi-check-circle text-success fs-3"></i>

                  <p className="fw-semibold mt-2 mb-1 small">
                    All stocks look good
                  </p>

                  <p className="text-muted small mb-0">
                    No stock alerts at the moment.
                  </p>
                </div>
              )}
            </div>

            <div className="border-top px-3 px-md-4 py-3 mt-auto">
              <div className="d-flex justify-content-between align-items-center gap-3">
                <span className="text-muted small">Current stock value</span>

                <span className="fw-bold text-dark text-nowrap">
                  {eListam.utils.formatCurrencyToPHP(metrics.stockValue)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
