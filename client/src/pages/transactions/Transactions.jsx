import { useContext, useEffect, useState } from "react";
import TransactionTable from "../../components/transactions/TransactionTable";
import Toolbar from "../../components/common/Toolbar";
import { TransactionContext } from "../../context/TransactionContext";
import PageTitle from "../../components/common/PageTitle";

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
      <Toolbar />

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
