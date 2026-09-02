function SearchBar({ handleSearchInput }) {
  return (
    <input
      className=" form-control text-black bg-white"
      type="search"
      placeholder="Search Items..."
      onChange={handleSearchInput}
    />
  );
}

export default SearchBar;
