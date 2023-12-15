import "./CountryInfoDisplay.css";

const CountryInfoDisplay = ({
  showResults,
  searchResults,
  weatherData,
  query,
  whatIsTheWeather,
}) => {
  return (
    <div>
      {showResults &&
        query.length > 0 &&
        searchResults &&
        searchResults.map((country, index) => (
          <div key={index}>
            <h3>Information on {country.name.common}:</h3>
            <li>Capital: {country.capital}</li>
            <li>Area: {country.area}</li>
            <h3>Languages:</h3>
            {searchResults &&
              query.length > 0 &&
              showResults &&
              Object.values(country.languages || {}).map((lang, index) => (
                <li key={index}>{lang}</li>
              ))}
            <h3>Flag:</h3>
            <img className="img" src={country.flags.svg} />
          </div>
        ))}
      {showResults &&
        query.length > 0 &&
        weatherData &&
        Object.keys(weatherData).length > 0 && (
          <div>
            <h3>Weather in {weatherData.name}: </h3>
            <p>
              Temperature: {(weatherData.main.temp - 272.15).toFixed(2)} Celsius
            </p>
            <img src={whatIsTheWeather} />
            <p>Wind: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      {query.length === 0 && <div></div>}
    </div>
  );
};

export default CountryInfoDisplay;
