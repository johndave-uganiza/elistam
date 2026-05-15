import { useEffect, useRef } from "react";
import { Modal } from "bootstrap";

function EditOrderDetailForm({
  showEditOrderDetailForm,
  setShowEditOrderDetailForm,
  handleUpdateOrderDetail,
  currentOrderDetail,
  setCurrentOrderDetail,
}) {
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);
  // const [orderDetail, setOrderDetail] = useState(currentOrderDetail);

  useEffect(() => {
    if (!modalRef.current) return;

    if (!bsModalRef.current) {
      bsModalRef.current = new Modal(modalRef.current, { backdrop: "static" });
    }

    if (showEditOrderDetailForm) {
      bsModalRef.current.show();
    } else {
      bsModalRef.current.hide();
    }
  }, [showEditOrderDetailForm]);

  return (
    <div ref={modalRef} className="modal fade" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content w-auto">
          <form onSubmit={handleUpdateOrderDetail}>
            <div className="modal-header">
              <div className="modal-title" id="staticBackdropLabel">
                <div className="fs-5 text-warning">Edit Order Detail</div>
                <small className=" text-muted">
                  {currentOrderDetail?.name}
                </small>
              </div>
              <button
                onClick={() => {
                  setShowEditOrderDetailForm(false);
                }}
                type="button"
                className="btn-close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="d-flex mb-3 align-items-center gap-3">
                <label className="form-label w-auto">Order Quantity</label>
                <input
                  name="quantity"
                  className="form-control w-auto"
                  type="number"
                  value={currentOrderDetail?.quantity || ""}
                  onChange={(e) => {
                    setCurrentOrderDetail({
                      ...currentOrderDetail,
                      [e.target.name]: e.target.value,
                    });
                  }}
                ></input>
                <span>unit/s</span>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-warning">
                Save
              </button>
              <button
                onClick={() => {
                  setShowEditOrderDetailForm(false);
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

export default EditOrderDetailForm;
