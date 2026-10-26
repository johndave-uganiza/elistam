import { API_BASE_URL, IMAGE_PLACEHOLDER_URL } from "../../utilities/constants";
import useTableColumnSort from "../../hooks/useTableColumnSort";
import SortHeader from "../common/SortHeader";
import EmptyItemTable from "./EmptyItemTable";

function ItemTable({ items, onEdit, onDelete }) {
  const {
    sortConfig,
    handleSort,
    sortedData: sortedItems,
  } = useTableColumnSort(items, {
    name: (item) => String(item.name || "").toLowerCase(),

    id: (item) => Number(item.id) || 0,

    price: (item) => Number(item.price) || 0,

    stock: (item) => Number(item.stock) || 0,

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
        label: "No Expr. Date",
        className: "text-bg-secondary",
      };
    }

    const expirationDate = new Date(expiration);
    const today = new Date();

    if (Number.isNaN(expirationDate.getTime())) {
      return {
        label: "No Expr. Date",
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
                className="ps-3 text-nowrap"
              />

              <SortHeader
                label="Item No."
                sortKey="id"
                sortConfig={sortConfig}
                onSort={handleSort}
                className="text-nowrap"
              />

              <SortHeader
                label="Cost"
                sortKey="cost"
                sortConfig={sortConfig}
                onSort={handleSort}
                className="text-center text-nowrap"
              />

              <SortHeader
                label="Price"
                sortKey="price"
                sortConfig={sortConfig}
                onSort={handleSort}
                className="text-center text-nowrap"
              />

              <SortHeader
                label="Stock"
                sortKey="stock"
                sortConfig={sortConfig}
                onSort={handleSort}
                className="text-center text-nowrap"
              />

              <SortHeader
                label="Expiration"
                sortKey="expirationDate"
                sortConfig={sortConfig}
                onSort={handleSort}
                className="text-center text-nowrap"
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

                    {/* Cost */}
                    <td className="text-center text-nowrap">
                      <span className="fw-normal">
                        {formatCurrency(item.cost)}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="text-center text-nowrap">
                      <span className="fw-semibold">
                        {formatCurrency(item.price)}
                      </span>
                    </td>

                    {/* Stock */}
                    <td className="text-center">
                      <span className="badge rounded-pill bg-light text-dark border px-3 py-2">
                        {item.stock ?? 0}
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
                  <EmptyItemTable />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          MOBILE VIEW - COMPACT RECTANGULAR ITEMS
      ====================================================== */}
      <div className="d-md-none">
        {/* Compact Header / Sort */}
        <div className="border-bottom bg-light px-2 py-2">
          <div className="d-flex align-items-center justify-content-between">
            <small className="text-muted fw-medium">
              {sortedItems.length} {sortedItems.length === 1 ? "item" : "items"}
            </small>

            <div className="dropdown">
              <button
                type="button"
                className="btn btn-sm btn-white border py-1 px-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-label="Sort items"
              >
                <i className="bi bi-sort-down" />
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                {[
                  ["name", "Name"],
                  ["id", "Item No."],
                  ["price", "Price"],
                  ["stock", "Stock"],
                  ["expirationDate", "Expiration"],
                ].map(([key, label]) => (
                  <li key={key}>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleSort(key)}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Compact Item List */}
        <div
          style={{
            maxHeight: "calc(100vh - 260px)",
            minHeight: "200px",
            overflowY: "auto",
          }}
        >
          {sortedItems.length > 0 ? (
            <div>
              {sortedItems.map((item) => {
                const expirationStatus = getExpirationStatus(
                  item.expirationDate,
                );

                return (
                  <div
                    key={item.id}
                    className="d-flex align-items-center gap-2 px-2 py-2 border-bottom"
                    style={{
                      minHeight: "76px",
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      className="rounded-2 bg-light border overflow-hidden flex-shrink-0"
                      style={{
                        width: "44px",
                        height: "44px",
                      }}
                    >
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name || "Item"}
                        loading="lazy"
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

                    {/* Essential Details */}
                    <div
                      className="flex-grow-1 overflow-hidden"
                      style={{ minWidth: 0 }}
                    >
                      <div
                        className="fw-semibold text-dark text-truncate"
                        style={{
                          fontSize: "0.84rem",
                          lineHeight: 1.3,
                        }}
                        title={item.name}
                      >
                        {item.name || "Unnamed item"}
                      </div>

                      <div
                        className="d-flex align-items-center flex-wrap gap-1 mt-1"
                        style={{
                          fontSize: "0.75rem",
                          lineHeight: 1.3,
                        }}
                      >
                        <span className="fw-bold text-black">
                          {formatCurrency(item.price)}
                        </span>

                        <span className="text-muted fw-medium">·</span>

                        <span className="text-muted fw-medium">
                          Qty {item.stock ?? 0}
                        </span>
                      </div>

                      <div className="d-flex align-items-center gap-1 mt-1">
                        <span
                          className={`badge rounded-pill ${expirationStatus.className}`}
                          style={{
                            fontSize: "0.62rem",
                            fontWeight: 500,
                          }}
                        >
                          {expirationStatus.label}
                        </span>

                        {item.expirationDate && (
                          <span
                            className="text-muted text-truncate"
                            style={{ fontSize: "0.68rem" }}
                          >
                            {formatDate(item.expirationDate)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Icon-only Actions */}
                    <div className="d-flex flex-column gap-1 flex-shrink-0">
                      <button
                        type="button"
                        className="btn btn-sm btn-light border text-primary p-1"
                        onClick={() => onEdit(item)}
                        title="Edit item"
                        aria-label={`Edit ${item.name || "item"}`}
                        style={{
                          width: "30px",
                          height: "28px",
                          lineHeight: 1,
                        }}
                      >
                        <i className="bi bi-pencil" />
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm btn-light border text-danger p-1"
                        onClick={() => onDelete(item)}
                        title="Delete item"
                        aria-label={`Delete ${item.name || "item"}`}
                        style={{
                          width: "30px",
                          height: "28px",
                          lineHeight: 1,
                        }}
                      >
                        <i className="bi bi-trash3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyItemTable />
          )}
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      {sortedItems.length > 0 && (
        <div className="border-top bg-light px-3 py-2">
          <small className="text-muted">
            <i className="bi bi-box-seam me-1"></i>
            {sortedItems.length} {sortedItems.length !== 1 ? "items" : "item"}
          </small>
        </div>
      )}
    </div>
  );
}

export default ItemTable;
