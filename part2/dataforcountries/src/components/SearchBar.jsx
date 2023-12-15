import "./SearchBar.css";

const SearchBar = ({ handleQuery, query }) => {
  return (
    <div className="searchbar">
      <h3>Find a country: </h3>
      <form>
        <input onChange={handleQuery} type="search" value={query} />
      </form>
    </div>
  );
};

export default SearchBar;
