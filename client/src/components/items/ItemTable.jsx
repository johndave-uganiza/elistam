import { API_BASE_URL, IMAGE_PLACEHOLDER_URL } from "../../utilities/constants";
import useTableColumnSort from "../../hooks/useTableColumnSort";
import SortHeader from "../common/SortHeader";

function ItemTable({ items, onEdit, onDelete }) {
  const {
    sortConfig,
    handleSort,
    sortedData: sortedItems,
  } = useTableColumnSort(items, {
    name: (item) => String(item.name || "").toLowerCase(),

    id: (item) => Number(item.id) || 0,

    price: (item) => Number(item.price) || 0,

    quantity: (item) => Number(item.quantity) || 0,

    expirationDate: (item) => {
      if (!item.expirationDate) {
        return null;
      }

      const timestamp = new Date(item.expirationDate).getTime();

      return Number.isNaN(timestamp) ? null : timestamp;
    },
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(value) || 0);
  };

  const formatDate = (value) => {
    if (!value) {
      return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getImageUrl = (image) => {
    if (!image) {
      return IMAGE_PLACEHOLDER_URL;
    }

    if (image.startsWith("images")) {
      return `${API_BASE_URL}/${image}`;
    }

    return image;
  };

  const getExpirationStatus = (expiration) => {
    if (!expiration) {
      return {
        label: "No date",
        className: "text-bg-secondary",
      };
    }

    const expirationDate = new Date(expiration);
    const today = new Date();

    if (Number.isNaN(expirationDate.getTime())) {
      return {
        label: "No date",
        className: "text-bg-secondary",
      };
    }

    today.setHours(0, 0, 0, 0);
    expirationDate.setHours(0, 0, 0, 0);

    const difference = expirationDate.getTime() - today.getTime();

    const daysRemaining = Math.ceil(difference / (1000 * 60 * 60 * 24));

    if (daysRemaining < 0) {
      return {
        label: "Expired",
        className: "text-bg-danger",
      };
    }

    if (daysRemaining <= 30) {
      return {
        label: `${daysRemaining}d left`,
        className: "text-bg-warning",
      };
    }

    return {
      label: `${daysRemaining}d left`,
      className: "text-bg-success",
    };
  };

  const EmptyState = () => (
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

  return (
    <div className="bg-white rounded-3 border overflow-hidden">
      {/* =====================================================
          DESKTOP / TABLET TABLE
      ====================================================== */}
      <div
        className="d-none d-md-block table-responsive"
        style={{
          maxHeight: "calc(100vh - 300px)",
          minHeight: "300px",
          overflowY: "auto",
        }}
      >
        <table className="table table-hover align-middle mb-0">
          {/* Header */}
          <thead
            className="table-light"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 2,
            }}
          >
            <tr>
              <SortHeader
                label="Item"
                sortKey="name"
                sortConfig={sortConfig}
                onSort={handleSort}
                className="ps-3"
              />

              <SortHeader
                label="Item No."
                sortKey="id"
                sortConfig={sortConfig}
                onSort={handleSort}
              />

              <SortHeader
                label="Price"
                sortKey="price"
                sortConfig={sortConfig}
                onSort={handleSort}
                className="text-center"
              />

              <SortHeader
                label="Quantity"
                sortKey="quantity"
                sortConfig={sortConfig}
                onSort={handleSort}
                className="text-center"
              />

              <SortHeader
                label="Expiration"
                sortKey="expirationDate"
                sortConfig={sortConfig}
                onSort={handleSort}
                className="text-center"
              />

              <th
                className="border-0 text-center pe-3 py-3"
                style={{
                  fontSize: "0.82rem",
                  letterSpacing: "0.02em",
                }}
              >
                ACTION
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {sortedItems.length > 0 ? (
              sortedItems.map((item) => {
                const expirationStatus = getExpirationStatus(
                  item.expirationDate,
                );

                return (
                  <tr key={item.id}>
                    {/* Item */}
                    <td className="ps-3 py-2">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-3 bg-light border overflow-hidden flex-shrink-0"
                          style={{
                            width: "58px",
                            height: "58px",
                          }}
                        >
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.name || "Item"}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = IMAGE_PLACEHOLDER_URL;
                            }}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        <div
                          style={{
                            minWidth: 0,
                          }}
                        >
                          <div
                            className="fw-semibold text-dark text-truncate"
                            style={{
                              maxWidth: "280px",
                            }}
                            title={item.name}
                          >
                            {item.name || "Unnamed item"}
                          </div>

                          {item.description && (
                            <small
                              className="text-muted d-block text-truncate"
                              style={{
                                maxWidth: "280px",
                              }}
                              title={item.description}
                            >
                              {item.description}
                            </small>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Item Number */}
                    <td>
                      <span className="font-monospace small text-muted">
                        ITM-
                        {String(item.id).padStart(3, "0")}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="text-center text-nowrap">
                      <span className="fw-semibold">
                        {formatCurrency(item.price)}
                      </span>
                    </td>

                    {/* Quantity */}
                    <td className="text-center">
                      <span className="badge rounded-pill bg-light text-dark border px-3 py-2">
                        {item.quantity ?? 0}
                      </span>
                    </td>

                    {/* Expiration */}
                    <td className="text-center">
                      <div className="d-flex flex-column align-items-center gap-1">
                        <span className="small">
                          {formatDate(item.expirationDate)}
                        </span>

                        <span
                          className={`badge rounded-pill ${expirationStatus.className}`}
                        >
                          {expirationStatus.label}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="text-center pe-3">
                      <div className="d-flex justify-content-center gap-1">
                        <button
                          type="button"
                          className="btn btn-sm btn-light border text-primary"
                          onClick={() => onEdit(item)}
                          title="Edit item"
                        >
                          <i className="bi bi-pencil-square"></i>

                          <span className="ms-1 d-none d-lg-inline">Edit</span>
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-light border text-danger"
                          onClick={() => onDelete(item)}
                          title="Delete item"
                        >
                          <i className="bi bi-trash3"></i>

                          <span className="ms-1 d-none d-lg-inline">
                            Delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="border-0">
                  <EmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          MOBILE VIEW
      ====================================================== */}
      <div className="d-md-none">
        {/* Mobile Header / Sort */}
        <div className="border-bottom bg-light px-3 py-2">
          <div className="d-flex align-items-center justify-content-between">
            <small className="text-muted fw-medium">
              {sortedItems.length} {sortedItems.length === 1 ? "item" : "items"}
            </small>

            <div className="dropdown">
              <button
                type="button"
                className="btn btn-sm btn-white border dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-sort-down me-1"></i>
                Sort
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleSort("name")}
                  >
                    Name
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleSort("id")}
                  >
                    Item No.
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleSort("price")}
                  >
                    Price
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleSort("quantity")}
                  >
                    Quantity
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleSort("expirationDate")}
                  >
                    Expiration
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Items */}
        <div
          style={{
            maxHeight: "calc(100vh - 300px)",
            minHeight: "300px",
            overflowY: "auto",
          }}
        >
          {sortedItems.length > 0 ? (
            <div className="list-group list-group-flush">
              {sortedItems.map((item) => {
                const expirationStatus = getExpirationStatus(
                  item.expirationDate,
                );

                return (
                  <div key={item.id} className="list-group-item px-3 py-3">
                    {/* Item Header */}
                    <div className="d-flex align-items-start gap-3">
                      {/* Image */}
                      <div
                        className="rounded-3 bg-light border overflow-hidden flex-shrink-0"
                        style={{
                          width: "64px",
                          height: "64px",
                        }}
                      >
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name || "Item"}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = IMAGE_PLACEHOLDER_URL;
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      {/* Name / Item Number */}
                      <div
                        className="flex-grow-1"
                        style={{
                          minWidth: 0,
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-start gap-2">
                          <div
                            className="fw-semibold text-dark text-truncate"
                            title={item.name}
                          >
                            {item.name || "Unnamed item"}
                          </div>

                          <span className="font-monospace small text-muted text-nowrap">
                            ITM-
                            {String(item.id).padStart(3, "0")}
                          </span>
                        </div>

                        {item.description && (
                          <div
                            className="small text-muted mt-1"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="row g-2 mt-2">
                      {/* Price */}
                      <div className="col-6">
                        <div className="bg-light rounded-3 px-2 py-2 h-100">
                          <small className="text-muted d-block">Price</small>

                          <span className="fw-semibold">
                            {formatCurrency(item.price)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="col-6">
                        <div className="bg-light rounded-3 px-2 py-2 h-100">
                          <small className="text-muted d-block">Quantity</small>

                          <span className="badge rounded-pill bg-white text-dark border mt-1">
                            {item.quantity ?? 0}
                          </span>
                        </div>
                      </div>

                      {/* Expiration */}
                      <div className="col-12">
                        <div className="bg-light rounded-3 px-2 py-2 d-flex align-items-center justify-content-between gap-2">
                          <div>
                            <small className="text-muted d-block">
                              Expiration
                            </small>

                            <span className="small fw-medium">
                              {formatDate(item.expirationDate)}
                            </span>
                          </div>

                          <span
                            className={`badge rounded-pill ${expirationStatus.className}`}
                          >
                            {expirationStatus.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="d-flex gap-2 mt-3">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary flex-fill"
                        onClick={() => onEdit(item)}
                      >
                        <i className="bi bi-pencil-square me-1"></i>
                        Edit
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger flex-fill"
                        onClick={() => onDelete(item)}
                      >
                        <i className="bi bi-trash3 me-1"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      {sortedItems.length > 0 && (
        <div className="border-top bg-light px-3 py-2">
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              <i className="bi bi-box-seam me-1"></i>
              {sortedItems.length} {sortedItems.length !== 1 ? "items" : "item"}
            </small>

            <small className="text-muted d-none d-sm-inline">
              Click a column to sort
            </small>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemTable;
