function EmptyTableState({ icon, title, description }) {
  return (
    <div className="p-3 p-md-4">
      <div className="d-flex flex-column align-items-center justify-content-center text-center bg-light rounded-4 px-3 py-5">
        <div
          className="rounded-4 bg-dark-subtle text-dark d-flex align-items-center justify-content-center mb-3"
          style={{
            width: "72px",
            height: "72px",
          }}
        >
          <i className={`bi ${icon} fs-2`} aria-hidden="true" />
        </div>

        <h5 className="fw-bold text-dark mb-2">{title}</h5>

        <p className="text-muted small mb-0" style={{ maxWidth: "360px" }}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default EmptyTableState;
