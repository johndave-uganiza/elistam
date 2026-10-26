import { useState } from "react";
import TransactionModal from "./TransactionModal";
import useTableColumnSort from "../../hooks/useTableColumnSort";
import SortHeader from "../common/SortHeader";
import eListam from "@/utilities//eListam";
import EmptyTransactionTable from "./EmptyTransactionTable";

function TransactionTable({ transactions, deleteTransaction }) {
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
                            className="btn btn-sm btn-light border text-danger px-3"
                            onClick={() => deleteTransaction(tran)}
                            title="Delete Transaction"
                          >
                            <i className="bi bi-trash3 me-1"></i>

                            <span className="d-none d-lg-inline">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="border-0">
                    <EmptyTransactionTable />
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
          <div className="border-bottom bg-light px-2 py-2">
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
                  className="btn btn-sm btn-white border py-1 px-2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="Sort transactions"
                >
                  <i className="bi bi-sort-down" />
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                  {[
                    ["transactionNumber", "Transaction"],
                    ["orderNumber", "Order"],
                    ["date", "Date"],
                    ["status", "Status"],
                    ["totalQuantity", "Quantity"],
                    ["totalPrice", "Total"],
                  ].map(([key, label]) => (
                    <li key={key}>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => handleSort(key)}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Compact Transaction List */}
          <div
            style={{
              maxHeight: "calc(100vh - 260px)",
              minHeight: "200px",
              overflowY: "auto",
            }}
          >
            {sortedTransactions.length > 0 ? (
              <div>
                {sortedTransactions.map((tran) => {
                  const status = tran.status || "Paid";

                  return (
                    <div
                      key={tran.id || tran.transactionNumber}
                      className="d-flex align-items-center gap-2 px-2 py-2 border-bottom"
                      style={{
                        minHeight: "68px",
                      }}
                    >
                      {/* Receipt Icon */}
                      <div
                        className="rounded-2 bg-primary-subtle text-primary d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: "38px",
                          height: "38px",
                        }}
                      >
                        <i className="bi bi-receipt" />
                      </div>

                      {/* Essential Transaction Details */}
                      <div
                        className="flex-grow-1 overflow-hidden"
                        style={{
                          minWidth: 0,
                        }}
                      >
                        {/* Transaction Number + Status */}
                        <div className="d-flex align-items-center gap-1">
                          <div
                            className="fw-semibold text-dark text-truncate flex-grow-1"
                            style={{
                              fontSize: "0.82rem",
                              lineHeight: 1.3,
                              minWidth: 0,
                            }}
                            title={tran.transactionNumber}
                          >
                            {tran.transactionNumber || "TRAN-###"}
                          </div>

                          <span
                            className={`badge rounded-pill flex-shrink-0 ${getStatusClass(
                              status,
                            )}`}
                            style={{
                              fontSize: "0.6rem",
                              fontWeight: 500,
                            }}
                          >
                            {status}
                          </span>
                        </div>

                        {/* Order Number + Date */}
                        <div
                          className="d-flex align-items-center gap-1 mt-1 text-muted"
                          style={{
                            fontSize: "0.7rem",
                            lineHeight: 1.3,
                          }}
                        >
                          <span
                            className="font-monospace text-truncate"
                            style={{
                              maxWidth: "55%",
                            }}
                            title={tran.orderNumber}
                          >
                            {tran.orderNumber || "No order"}
                          </span>

                          <span>·</span>

                          <span className="text-truncate">
                            {eListam.utils.formatDate(tran.date)}
                          </span>
                        </div>

                        {/* Total + Quantity */}
                        <div
                          className="d-flex align-items-center flex-wrap gap-1 mt-1"
                          style={{
                            fontSize: "0.75rem",
                            lineHeight: 1.3,
                          }}
                        >
                          <span className="fw-bold text-dark">
                            {eListam.utils.formatCurrency(tran.totalPrice)}
                          </span>

                          <span className="text-muted fw-medium">·</span>

                          <span className="text-muted fw-medium">
                            Qty {tran.totalQuantity ?? 0}
                          </span>
                        </div>
                      </div>

                      {/* Compact Icon-Only Actions */}
                      <div className="d-flex flex-column gap-1 flex-shrink-0">
                        <button
                          type="button"
                          className="btn btn-sm btn-light border text-primary p-1"
                          onClick={() => handleViewTransaction(tran)}
                          title="View transaction"
                          aria-label={`View transaction ${
                            tran.transactionNumber || ""
                          }`}
                          style={{
                            width: "30px",
                            height: "27px",
                            lineHeight: 1,
                          }}
                        >
                          <i className="bi bi-eye" />
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-light border text-danger p-1"
                          onClick={() => deleteTransaction(tran)}
                          title="Delete transaction"
                          aria-label={`Delete transaction ${
                            tran.transactionNumber || ""
                          }`}
                          style={{
                            width: "30px",
                            height: "27px",
                            lineHeight: 1,
                          }}
                        >
                          <i className="bi bi-trash3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyTransactionTable />
            )}
          </div>
        </div>

        {/* =====================================================
            FOOTER
        ====================================================== */}
        {sortedTransactions.length > 0 && (
          <div className="border-top bg-light px-3 py-2">
            <small className="text-muted">
              <i className="bi bi-receipt me-1"></i>
              {sortedTransactions.length} transaction
              {sortedTransactions.length !== 1 ? "s" : ""}
            </small>
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
