import "./SearchDisplay.css";

const SearchDisplay = ({
  displaySearch,
  searchResults,
  handleShowCountry,
  query,
}) => {
  return (
    <div>
      {query.length > 0 && !displaySearch && (
        <div>
          Too many countries. Please specify the country you are looking for.
        </div>
      )}

      {displaySearch &&
        searchResults.map((country, index) => (
          <div className="countries" key={index}>
            <li>{country.name.common}</li>

            {searchResults.length > 1 && (
              <button
                onClick={() => {
                  handleShowCountry(country.name.common);
                }}
              >
                show info for {country.name.common}
              </button>
            )}
          </div>
        ))}
    </div>
  );
};

export default SearchDisplay;
