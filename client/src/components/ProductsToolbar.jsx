import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";

function ProductsToolbar({
  handleAddProductClick,
  handleSearchInput,
  handleSortByChange,
  products,
  sortBy,
}) {
  return (
    <div>
      <div className="row">
        <div className="col-6">
          <SearchBar handleSearchInput={handleSearchInput} />
          <SortDropdown
            handleSortByChange={handleSortByChange}
            sortBy={sortBy}
          />
        </div>
        <div className="col-6 d-flex justify-content-end">
          <div>
            <h6 className=" py-3">Total Products:{products?.length}</h6>
            <button
              onClick={() => handleAddProductClick()}
              className="btn btn-sm btn-primary p-2"
            >
              + Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsToolbar;
