import { useContext, useEffect, useState, useMemo } from "react";
import TransactionTable from "../../components/transactions/TransactionTable";
import Toolbar from "../../components/common/Toolbar";
import { TransactionContext } from "../../context/TransactionContext";
import PageTitle from "../../components/common/PageTitle";

function Transactions() {
  const { getTransactions, exportTransaction } = useContext(TransactionContext);
  const [transactions, setTransactions] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await getTransactions();
      setTransactions(data || []);
    };

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

  return (
    <div className="container px-3 px-md-4 py-2">
      {/* Page Title */}
      <PageTitle
        title={"Sales History"}
        description={"Review past transactions and track sales trends."}
        label={"Transaction"}
        total={transactions?.length || 0}
      />
      {/* Toolbar */}
      <Toolbar onSearch={handleSearchInput} />

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
            exportTransaction={exportTransaction}
          />
        </div>
      )}
    </div>
  );
}

export default Transactions;
