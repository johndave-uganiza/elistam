import SearchBar from "../common/SearchBar";
import SortDropdown from "../common/SortDropdown";

function ProductsToolbar({ handleSearchInput, handleSortByChange, sortBy }) {
  return (
    <div className="d-flex justify-content-between p-0 gap-3">
      <SearchBar handleSearchInput={handleSearchInput} />
      <SortDropdown handleSortByChange={handleSortByChange} sortBy={sortBy} />
    </div>
  );
}

export default ProductsToolbar;
