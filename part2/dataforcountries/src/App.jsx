import "./App.css";

import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import SearchDisplay from "./components/SearchDisplay";
import CountryInfoDisplay from "./components/CountryInfoDisplay";
import Header from "./components/Header";

const url = "https://studies.cs.helsinki.fi/restcountries/api/all";
const api_key = import.meta.env.VITE_SOME_KEY;

// used an environment variable to save API key.

function App() {
  const [query, setQuery] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [whatIsTheWeather, setWhatIsTheWeather] = useState({});
  const [searchResults, setSearchResults] = useState({});

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const allCountriesData = response.data;
        setAllCountries(allCountriesData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const searchFilter = allCountries.filter((x) =>
      x.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(searchFilter);
  }, [allCountries, query]);

  useEffect(() => {
    if (query.length === 0 || searchResults.length > 10) {
      setDisplaySearch(false);
    } else if (query.length > 0 && searchResults.length <= 10) {
      setDisplaySearch(true);
    }
  }, [query, searchResults]);

  useEffect(() => {
    if (searchResults.length === 1) {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchResults[0].capital[0]}&appid=${api_key}`;
      axios
        .get(weatherUrl)
        .then((response) => {
          const cityWeatherData = response.data;
          const imgUrl = `https://openweathermap.org/img/wn/${cityWeatherData.weather[0].icon}@2x.png`;
          setWeatherData(cityWeatherData);
          setWhatIsTheWeather(imgUrl);
        })
        .catch((error) => {
          alert(
            `Unable to find weather info for ${searchResults[0].capital[0]}. Please try another country.`
          );
        });

      setShowResults(true);
    } else {
      setShowResults(false);
      setWeatherData([]);
    }
  }, [searchResults]);

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleShowCountry = (props) => {
    setQuery(props);
  };

  return (
    <>
      <div>
        <Header />
        <SearchBar handleQuery={handleQuery} query={query} />
        <SearchDisplay
          displaySearch={displaySearch}
          searchResults={searchResults}
          handleShowCountry={handleShowCountry}
          query={query}
        />
        <CountryInfoDisplay
          showResults={showResults}
          searchResults={searchResults}
          weatherData={weatherData}
          whatIsTheWeather={whatIsTheWeather}
          query={query}
        />
      </div>
    </>
  );
}

export default App;

//ral
