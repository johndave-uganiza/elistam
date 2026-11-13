function PageTitle({ title, description, label, total }) {
  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3">
      <div className="min-w-0">
        {/* Title */}
        <h3 className="fw-bold mb-0">{title}</h3>
        {/* Description */}
        <p className="text-muted small mb-0">{description}</p>
      </div>

      <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2 flex-shrink-0 d-none d-md-block">
        <i className="bi bi-box-seam me-1"></i>
        {total} {total === 1 ? label : `${label}s`}
      </span>
    </div>
  );
}

export default PageTitle;
