function SortHeader({ label, sortKey, sortConfig, onSort, className = "" }) {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return (
        <i
          className="bi bi-arrow-down-up text-muted ms-1"
          style={{ fontSize: "0.7rem" }}
        />
      );
    }

    return sortConfig.direction === "asc" ? (
      <i
        className="bi bi-arrow-up text-primary ms-1"
        style={{ fontSize: "0.8rem" }}
      />
    ) : (
      <i
        className="bi bi-arrow-down text-primary ms-1"
        style={{ fontSize: "0.8rem" }}
      />
    );
  };

  return (
    <th className={`border-0 py-3 ${className}`}>
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className="btn btn-sm p-0 border-0 bg-transparent text-black fw-bold text-uppercase"
        style={{
          fontSize: "0.82rem",
          letterSpacing: "0.02em",
        }}
      >
        {label}
        {getSortIcon(sortKey)}
      </button>
    </th>
  );
}
export default SortHeader;
