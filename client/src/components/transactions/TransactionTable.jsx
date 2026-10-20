import { useState } from "react";
import TransactionModal from "./TransactionModal";
import useTableColumnSort from "../../hooks/useTableColumnSort";
import SortHeader from "../common/SortHeader";
import eListam from "@/utilities//eListam";

function TransactionTable({ transactions, exportTransaction }) {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    sortedData: sortedTransactions,
    sortConfig,
    handleSort,
  } = useTableColumnSort(transactions, {
    date: (transaction) => new Date(transaction.date).getTime(),

    totalQuantity: (transaction) => Number(transaction.totalQuantity) || 0,

    totalPrice: (transaction) => Number(transaction.totalPrice) || 0,

    transactionNumber: (transaction) =>
      String(transaction.transactionNumber || "").toLowerCase(),

    orderNumber: (transaction) =>
      String(transaction.orderNumber || "").toLowerCase(),

    status: (transaction) => String(transaction.status || "").toLowerCase(),
  });

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

  const getStatusClass = (status) => {
    const normalizedStatus = String(status || "Paid")
      .toLowerCase()
      .trim();

    switch (normalizedStatus) {
      case "paid":
      case "completed":
      case "complete":
        return "text-bg-success";

      case "pending":
        return "text-bg-warning";

      case "cancelled":
      case "canceled":
      case "failed":
        return "text-bg-danger";

      case "refunded":
        return "text-bg-info";

      default:
        return "text-bg-secondary";
    }
  };

  const EmptyState = () => (
    <div className="d-flex flex-column align-items-center justify-content-center text-muted py-5">
      <div
        className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-3"
        style={{
          width: "72px",
          height: "72px",
        }}
      >
        <i
          className="bi bi-receipt"
          style={{
            fontSize: "2rem",
          }}
        />
      </div>

      <h6 className="fw-semibold text-dark mb-1">No transactions found</h6>

      <small>Completed transactions will appear here.</small>
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-3 border overflow-hidden">
        {/* =====================================================
            DESKTOP / TABLET TABLE
        ====================================================== */}
        <div
          className="d-none d-md-block table-responsive"
          style={{
            maxHeight: "calc(100vh - 300px)",
            minHeight: "300px",
            overflowY: "auto",
          }}
        >
          <table className="table table-hover align-middle mb-0">
            {/* Header */}
            <thead
              className="table-light"
              style={{
                position: "sticky",
                top: 0,
                zIndex: 2,
              }}
            >
              <tr>
                <SortHeader
                  label="Transaction #"
                  sortKey="transactionNumber"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  className="ps-3 text-nowrap"
                />

                <SortHeader
                  label="Order #"
                  sortKey="orderNumber"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  className="text-nowrap"
                />

                <SortHeader
                  label="Date"
                  sortKey="date"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  className="text-nowrap"
                />

                <SortHeader
                  label="Payment Method"
                  sortKey="paymentMethod"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  className="text-nowrap"
                />

                <SortHeader
                  label="Status"
                  sortKey="status"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  className="text-nowrap"
                />

                <SortHeader
                  label="Qty"
                  sortKey="totalQuantity"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  className="text-center text-nowrap"
                />

                <SortHeader
                  label="Total"
                  sortKey="totalPrice"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  className="ps-3 text-center text-nowrap"
                />

                <th
                  className="border-0 text-center pe-3 py-3"
                  style={{
                    fontSize: "0.82rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  ACTIONS
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((tran) => {
                  const status = tran.status || "Paid";

                  return (
                    <tr key={tran.id || tran.transactionNumber}>
                      {/* Transaction */}
                      <td className="ps-3 py-3">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                              width: "38px",
                              height: "38px",
                            }}
                          >
                            <i className="bi bi-receipt"></i>
                          </div>

                          <div>
                            <div className="fw-semibold text-dark">
                              {tran.transactionNumber || "TRAN-###"}
                            </div>

                            <small className="text-muted">Transaction</small>
                          </div>
                        </div>
                      </td>

                      {/* Order */}
                      <td>
                        <span className="font-monospace small text-muted">
                          {tran.orderNumber || "ORDER-###"}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="text-nowrap">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-calendar3 text-muted"></i>

                          <span className="small">
                            {eListam.utils.formatDate(tran.date)}
                          </span>
                        </div>
                      </td>

                      {/* Payment Method */}
                      <td>
                        <div className="text-center border border-1 col-8 py-1">
                          {tran.paymentMethod}
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={`badge rounded-pill ${getStatusClass(
                            status,
                          )}`}
                        >
                          {status}
                        </span>
                      </td>

                      {/* Quantity */}
                      <td className="text-center">
                        <span className="badge rounded-pill bg-light text-dark border px-3 py-2">
                          {tran.totalQuantity ?? 0}
                        </span>
                      </td>

                      {/* Total */}
                      <td className="text-center text-nowrap">
                        <span className="fw-semibold">
                          {eListam.utils.formatCurrency(tran.totalPrice)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="text-center pe-3">
                        <div className="d-flex justify-content-center gap-1">
                          <button
                            type="button"
                            className="btn btn-sm btn-light border text-primary px-3"
                            onClick={() => handleViewTransaction(tran)}
                            title="View transaction"
                          >
                            <i className="bi bi-eye me-1"></i>

                            <span className="d-none d-lg-inline">View</span>
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-light border text-dark px-3"
                            onClick={() => exportTransaction(tran.id)}
                            title="Export transaction to CSV"
                          >
                            <i className="bi bi-filetype-csv me-1"></i>

                            <span className="d-none d-lg-inline">Export</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="border-0">
                    <EmptyState />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =====================================================
            MOBILE VIEW
        ====================================================== */}
        <div className="d-md-none">
          {/* Mobile Header / Sort */}
          <div className="border-bottom bg-light px-3 py-2">
            <div className="d-flex align-items-center justify-content-between">
              <small className="text-muted fw-medium">
                {sortedTransactions.length}{" "}
                {sortedTransactions.length === 1
                  ? "transaction"
                  : "transactions"}
              </small>

              <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-sm btn-white border dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-sort-down me-1"></i>
                  Sort
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleSort("transactionNumber")}
                    >
                      Transaction
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleSort("orderNumber")}
                    >
                      Order
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleSort("date")}
                    >
                      Date
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleSort("status")}
                    >
                      Status
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleSort("totalQuantity")}
                    >
                      Quantity
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleSort("totalPrice")}
                    >
                      Total
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile Transactions */}
          <div
            style={{
              maxHeight: "calc(100vh - 300px)",
              minHeight: "300px",
              overflowY: "auto",
            }}
          >
            {sortedTransactions.length > 0 ? (
              <div className="list-group list-group-flush">
                {sortedTransactions.map((tran) => {
                  const status = tran.status || "Paid";

                  return (
                    <div
                      key={tran.id || tran.transactionNumber}
                      className="list-group-item px-3 py-3"
                    >
                      {/* Transaction Header */}
                      <div className="d-flex align-items-start gap-3">
                        {/* Icon */}
                        <div
                          className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{
                            width: "48px",
                            height: "48px",
                          }}
                        >
                          <i
                            className="bi bi-receipt"
                            style={{
                              fontSize: "1.2rem",
                            }}
                          ></i>
                        </div>

                        {/* Transaction Details */}
                        <div
                          className="flex-grow-1"
                          style={{
                            minWidth: 0,
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-start gap-2">
                            <div
                              className="fw-semibold text-dark text-truncate"
                              title={tran.transactionNumber}
                            >
                              {tran.transactionNumber || "TRAN-###"}
                            </div>

                            <span
                              className={`badge rounded-pill flex-shrink-0 ${getStatusClass(
                                status,
                              )}`}
                            >
                              {status}
                            </span>
                          </div>

                          <div className="small text-muted mt-1">
                            <span className="font-monospace">
                              {tran.orderNumber}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Transaction Details */}
                      <div className="row g-2 mt-2">
                        {/* Date */}
                        <div className="col-12">
                          <div className="bg-light rounded-3 px-2 py-2">
                            <small className="text-muted d-block">Date</small>

                            <div className="d-flex align-items-center gap-2">
                              <i className="bi bi-calendar3 text-muted"></i>

                              <span className="small fw-medium">
                                {eListam.utils.formatDate(tran.date)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="col-6">
                          <div className="bg-light rounded-3 px-2 py-2 h-100">
                            <small className="text-muted d-block">
                              Quantity
                            </small>

                            <span className="badge rounded-pill bg-white text-dark border mt-1">
                              {tran.totalQuantity}
                            </span>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="col-6">
                          <div className="bg-light rounded-3 px-2 py-2 h-100">
                            <small className="text-muted d-block">Total</small>

                            <span className="fw-semibold">
                              {eListam.utils.formatCurrency(tran.totalPrice)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="d-flex gap-2 mt-3">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary flex-fill"
                          onClick={() => handleViewTransaction(tran)}
                        >
                          <i className="bi bi-eye me-1"></i>
                          View
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark flex-fill"
                          onClick={() => exportTransaction(tran.id)}
                        >
                          <i className="bi bi-filetype-csv me-1"></i>
                          Export
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>

        {/* =====================================================
            FOOTER
        ====================================================== */}
        {sortedTransactions.length > 0 && (
          <div className="border-top bg-light px-3 py-2">
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                <i className="bi bi-receipt me-1"></i>
                {sortedTransactions.length} transaction
                {sortedTransactions.length !== 1 ? "s" : ""}
              </small>

              <small className="text-muted d-none d-sm-inline">
                Click a column to sort
              </small>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Modal */}
      {showModal && selectedTransaction && (
        <TransactionModal
          selectedTransaction={selectedTransaction}
          onClose={handleClose}
        />
      )}
    </>
  );
}

export default TransactionTable;
