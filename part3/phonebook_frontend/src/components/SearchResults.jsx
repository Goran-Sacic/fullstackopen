import "./SearchResults.css";

const SearchResults = ({ searchResults, handleDeleteEntry }) => {
  return (
    <div>
      {searchResults.map((x) => (
        <div key={x.name} className="search_results">
          <p key={x.name}>
            {x.name} {x.number}
          </p>
          <button onClick={() => handleDeleteEntry(x.id, x.name)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
