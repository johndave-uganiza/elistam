import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";

function ProductsToolbar({
  handleAddProductClick,
  handleSearchInput,
  handleSortByChange,
  // products,
  sortBy,
}) {
  return (
    <div className="col-12 p-0 d-flex">
      <div className="col-6 d-flex align-items-center gap-2">
        <SearchBar handleSearchInput={handleSearchInput} />
        <SortDropdown handleSortByChange={handleSortByChange} sortBy={sortBy} />
      </div>
      <div className="col-6 text-end p-0">
        <button
          onClick={() => handleAddProductClick()}
          className="btn btn-sm btn-primary"
        >
          + Add Product
        </button>
      </div>
    </div>
  );
}

export default ProductsToolbar;
