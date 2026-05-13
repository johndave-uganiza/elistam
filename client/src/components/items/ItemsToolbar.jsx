import SearchBar from "../common/SearchBar";
import SortDropdown from "../common/SortDropdown";

function ProductsToolbar({
  handleAddItem,
  handleSearchInput,
  handleSortBy,
  sortBy,
}) {
  return (
    <div className="p-0 d-flex">
      <div className="col-6 d-flex align-items-center gap-2 flex-column flex-md-row">
        <SearchBar handleSearchInput={handleSearchInput} />
        <SortDropdown handleSortBy={handleSortBy} sortBy={sortBy} />
      </div>
      <div className="col-6 text-end p-0">
        <button
          onClick={() => handleAddItem()}
          className="btn btn-sm btn-primary"
        >
          + Add Item
        </button>
      </div>
    </div>
  );
}

export default ProductsToolbar;
