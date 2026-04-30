function SearchBar({ handleSearchInput }) {
  return (
    <div className="mb-3">
      <input
        className=" form-control text-black bg-white"
        type="search"
        placeholder="Search"
        onChange={handleSearchInput}
      />
    </div>
  );
}

export default SearchBar;
