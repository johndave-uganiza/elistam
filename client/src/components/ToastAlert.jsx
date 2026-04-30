function ToastAlert() {
  return (
    <div
      className="toast show position-fixed z-2 top-0 end-0 m-3 bg-white"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header bg-success">
        <strong className="me-auto text-white">Success</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body fw-bold">Item Added to Basket!</div>
    </div>
  );
}

export default ToastAlert;
