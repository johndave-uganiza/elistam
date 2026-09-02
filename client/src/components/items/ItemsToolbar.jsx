import SearchBar from "../common/SearchBar";
import SortDropdown from "../common/SortDropdown";

function ItemsToolbar({ onAdd, onSearch, onSort, sortBy }) {
  return (
    <div className="p-0 d-flex">
      <div className="col-6 d-flex align-items-center gap-2 flex-column flex-md-row">
        <SearchBar handleSearchInput={onSearch} />
        <SortDropdown handleSortBy={onSort} sortBy={sortBy} />
      </div>
      <div className="col-6 text-end p-0">
        <button onClick={onAdd} className="btn btn-md btn-success">
          <i className="bi bi-plus-circle"></i>
          <span className="ms-2 fw-medium">Add Item</span>
        </button>
      </div>
    </div>
  );
}

export default ItemsToolbar;
