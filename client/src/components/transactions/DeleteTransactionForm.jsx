import { useEffect, useRef } from "react";
import { Modal } from "bootstrap";

function DeleteTransactionForm({
  showDeleteTransactionForm,
  setShowDeleteTransactionForm,
  currentTransaction,
  handleConfirmDeleteTransaction,
}) {
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);

  useEffect(() => {
    if (!modalRef.current) return;

    if (!bsModalRef.current) {
      bsModalRef.current = new Modal(modalRef.current, { backdrop: "static" });
    }

    if (showDeleteTransactionForm) {
      bsModalRef.current.show();
    } else {
      bsModalRef.current.hide();
    }
  }, [showDeleteTransactionForm]);

  return (
    <div ref={modalRef} className="modal fade" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form
            onSubmit={(e) =>
              handleConfirmDeleteTransaction(e, currentTransaction)
            }
          >
            <div className="modal-header">
              <div className="modal-title" id="staticBackdropLabel">
                <div className="fs-5 text-danger">Delete Transaction</div>
              </div>
              <button
                onClick={() => {
                  setShowDeleteTransactionForm(false);
                }}
                type="button"
                className="btn-close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center">
                <p className="fs-6">
                  Are you sure you want to delete transaction{" "}
                  <strong className="text-warning">
                    {`T-${currentTransaction?.id}`}?
                  </strong>
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => {
                  bsModalRef.current.hide();
                  setShowDeleteTransactionForm(false);
                }}
                type="button"
                className="btn btn-info"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-danger">
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeleteTransactionForm;
