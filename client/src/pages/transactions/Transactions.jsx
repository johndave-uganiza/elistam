import { useContext, useEffect, useState } from "react";
import TransactionTable from "../../components/transactions/TransactionTable";
import Toolbar from "../../components/common/Toolbar";
import { TransactionContext } from "../../context/TransactionContext";

function Transactions() {
  const { getTransactions } = useContext(TransactionContext);
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const result = await getTransactions();
      setTransactions(result.data);
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <div className="row p-3">
        <div className="p-0 d-flex justify-content-between align-items-center">
          <h3 className="">Sales</h3>
          <h6 className="">Total Sales: 0</h6>
        </div>
      </div>
      <div className="row py-2 mb-2 p-3">
        <Toolbar
          // onShow={handleViewOrder}
          // onSearch={handleSearchInput}
          // onSort={handleSortBy}
          // // items={items}
          // sortBy={sortBy}
          label={
            <>
              <i className="bi bi-list-ul"></i> Generate Report
            </>
          }
        />
      </div>
      {transactions?.length == 0 && (
        <div
          className="container bg-white align-items-center d-flex justify-content-center rounded"
          style={{ height: "60vh" }}
        >
          <h2 className="row text-black-50">There are 0 transactions.</h2>
        </div>
      )}
      {transactions?.length > 0 && <TransactionTable transactions={transactions} />}
    </div>
  );
}

export default Transactions;
