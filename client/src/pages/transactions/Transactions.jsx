import { useContext, useEffect, useState, useMemo } from "react";
import TransactionTable from "../../components/transactions/TransactionTable";
import Toolbar from "../../components/common/Toolbar";
import { TransactionContext } from "../../context/TransactionContext";
import PageTitle from "../../components/common/PageTitle";
import Swal from "sweetalert2";

function Transactions() {
  const { getTransactions, exportTransaction, deleteTransaction } =
    useContext(TransactionContext);
  const [transactions, setTransactions] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchTransactions = async () => {
    const { data } = await getTransactions();
    setTransactions(data || []);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    let result = [...(transactions ?? [])];

    // Search
    if (searchInput.trim()) {
      const search = searchInput.toLowerCase().trim();

      result = result.filter(
        (transaction) =>
          transaction.transactionNumber?.toLowerCase().includes(search) ||
          transaction.orderNumber?.toLowerCase().includes(search),
      );
    }
    return result;
  }, [transactions, searchInput /* sortBy */]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleExportTransactions = async () => {
    await exportTransaction();
  };

  const handleDeleteTransaction = async (transaction) => {
    try {
      const result = await Swal.fire({
        title: `Delete ${transaction.transactionNumber}`,
        html: `
          <p style="margin-bottom: 8px; color: #555;">
              Are you sure you want to delete
              <strong style="color: #d33;">${transaction.transactionNumber}</strong>?
          </p>
          <p style="font-size: 13px; color: #888; margin-bottom: 0;">
              This action cannot be undone.
          </p>
      `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        focusCancel: true,
      });

      if (result.isConfirmed) {
        const deleteResult = await deleteTransaction(transaction.id);

        if (deleteResult?.isSuccess) {
          await fetchTransactions();

          await Swal.fire({
            title: "Deleted!",
            text: `${transaction.transactionNumber} has been deleted.`,
            icon: "success",
            timer: 2000,
            showConfirmButton: true,
          });
        }
      }
    } catch (error) {
      console.error("Failed to delete transaction:", error);

      Swal.fire({
        title: "Something went wrong",
        text: "Unable to delete the transaction.",
        icon: "error",
      });
    }
  };

  return (
    <div className="container px-3 px-md-4 py-2">
      {/* Page Title */}
      <PageTitle
        title={"Sales Transactions"}
        description={"Review past transactions and track sales trends."}
        label={"Transaction"}
        total={transactions?.length || 0}
      />
      {/* Toolbar */}
      <Toolbar
        onSearch={handleSearchInput}
        onAction={handleExportTransactions}
        label={
          <>
            <i className="bi bi-filetype-csv me-1"></i>
            <span>Export Transactions</span>
          </>
        }
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
            transactions={filteredTransactions}
            deleteTransaction={handleDeleteTransaction}
          />
        </div>
      )}
    </div>
  );
}

export default Transactions;
