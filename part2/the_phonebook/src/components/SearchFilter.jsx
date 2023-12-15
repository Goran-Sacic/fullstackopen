const SearchFilter = ({ query, handleSearch }) => {
  return (
    <div>
      Search phonebook:{" "}
      <input type="search" value={query} onChange={handleSearch} />
    </div>
  );
};

export default SearchFilter;
