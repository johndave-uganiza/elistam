import SearchBar from "../common/SearchBar";
import SortDropdown from "../common/SortDropdown";

function ProductsToolbar({ handleSearchInput, handleSortByChange, sortBy }) {
  return (
    <div className="p-0 d-flex">
      <div className="col-6 d-flex align-items-center gap-2 flex-column flex-md-row">
        <SearchBar handleSearchInput={handleSearchInput} />
        <SortDropdown handleSortByChange={handleSortByChange} sortBy={sortBy} />
      </div>
    </div>
  );
}

export default ProductsToolbar;
