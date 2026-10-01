function TransactionTable({ transactions }) {
  return (
    <div className="table-responsive-sm">
      <table className="table table-hover table-bordered">
        <thead className="table-secondary">
          <tr className="text-nowrap">
            <th>Order No.</th>
            <th>Date</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {transactions?.length > 0
            ? transactions.map((tran, index) => (
                <tr key={index}>
                  <td>ORDER-###</td>
                  <td>{tran.date}</td>

                  <td>{tran.totalQuantity}</td>
                  <td>{tran.totalPrice}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-outline-primary fw-medium"
                        // onClick={() => onEdit(item)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger fw-medium"
                        // onClick={() => onDelete(item)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
