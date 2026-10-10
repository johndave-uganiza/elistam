import { useContext, useEffect, useState } from "react";
import TransactionTable from "../../components/transactions/TransactionTable";
import Toolbar from "../../components/common/Toolbar";
import { TransactionContext } from "../../context/TransactionContext";

function Transactions() {
  const { getTransactions, exportTransaction } = useContext(TransactionContext);
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const result = await getTransactions();
      setTransactions(result.data);
    };

    fetchTransactions();
  }, []);

  const totalTransactions = transactions?.length || 0;

  return (
    <div className="container px-3 px-md-4 py-2">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
        <div>
          <h3 className="fw-bold mb-0">Sales History</h3>

          <p className="text-muted small mb-0">
            Review past transactions and track sales trends.
          </p>
        </div>

        <div className="mt-2 mt-md-0">
          <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2">
            <i className="bi bi-box-seam me-1"></i>
            {totalTransactions}{" "}
            {totalTransactions === 1 ? "Transaction" : "Transactions"}
          </span>
        </div>
      </div>

      <Toolbar
      // onShow={handleViewOrder}
      // onSearch={handleSearchInput}
      // onSort={handleSortBy}
      // // items={items}
      // sortBy={sortBy}
      // label={
      //   <>
      //     <i className="bi bi-database-fill-gear"></i> Generate Report
      //   </>
      // }
      />

      {transactions?.length == 0 && (
        <div
          className="container bg-white align-items-center d-flex justify-content-center rounded"
          style={{ height: "60vh" }}
        >
          <h2 className="row text-black-50">There are 0 transactions.</h2>
        </div>
      )}
      {transactions?.length > 0 && (
        <div className="card border-0 shadow-sm p-3">
          <TransactionTable
            transactions={transactions}
            exportTransaction={exportTransaction}
          />
        </div>
      )}
    </div>
  );
}

export default Transactions;
