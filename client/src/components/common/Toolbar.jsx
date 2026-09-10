import SearchBar from "../common/SearchBar";
import SortDropdown from "../common/SortDropdown";

function Toolbar({ onShow, onSearch, onSort, sortBy, label }) {
  return (
    <div className="p-0 d-flex">
      <div className="col-6 d-flex align-items-center gap-2 flex-column flex-md-row">
        <SearchBar handleSearchInput={onSearch} />
        <SortDropdown handleSortBy={onSort} sortBy={sortBy} />
      </div>
      <div className="col-6 text-end p-0">
        <button onClick={onShow} className="btn btn-md btn-dark">
          <span>{label}</span>
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
