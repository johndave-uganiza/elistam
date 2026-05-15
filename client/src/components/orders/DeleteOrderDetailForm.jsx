import { useEffect, useRef } from "react";
import { Modal } from "bootstrap";

function DeleteOrderDetailForm({
  showDeleteOrderDetailForm,
  setShowDeleteOrderDetailForm,
  handleConfirmDeleteOrderDetail,
  currentOrderDetail,
  // setCurrentOrderDetail,
}) {
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);
  // const [orderDetail, setOrderDetail] = useState(currentOrderDetail);

  useEffect(() => {
    if (!modalRef.current) return;

    if (!bsModalRef.current) {
      bsModalRef.current = new Modal(modalRef.current, { backdrop: "static" });
    }

    if (showDeleteOrderDetailForm) {
      bsModalRef.current.show();
    } else {
      bsModalRef.current.hide();
    }
  }, [showDeleteOrderDetailForm]);

  return (
    <div ref={modalRef} className="modal fade" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content w-auto">
          <form onSubmit={handleConfirmDeleteOrderDetail}>
            <div className="modal-header">
              <div className="modal-title" id="staticBackdropLabel">
                <div className="fs-5 text-danger">Delete Order Detail</div>
              </div>
              <button
                onClick={() => {
                  setShowDeleteOrderDetailForm(false);
                }}
                type="button"
                className="btn-close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="d-flex align-items-center">
                <p>
                  Are you sure you want to delete{" "}
                  <strong className="text-warning">
                    {currentOrderDetail?.name}
                  </strong>
                  ?
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-danger">
                Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteOrderDetailForm(false);
                }}
                type="button"
                className="btn btn-info"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeleteOrderDetailForm;
