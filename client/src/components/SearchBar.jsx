function SearchBar({ handleSearchInput }) {
  return (
    <input
      className=" form-control form-control-sm text-black bg-white"
      type="search"
      placeholder="Search Items..."
      onChange={handleSearchInput}
    />
  );
}

export default SearchBar;
