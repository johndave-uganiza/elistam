function EmptyItemTable() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-muted py-5">
      <div
        className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-3"
        style={{
          width: "72px",
          height: "72px",
        }}
      >
        <i
          className="bi bi-box-seam"
          style={{
            fontSize: "2rem",
          }}
        />
      </div>

      <h6 className="fw-semibold text-dark mb-1">No items found</h6>

      <small>Add an item to see it listed here.</small>
    </div>
  );
}

export default EmptyItemTable;
