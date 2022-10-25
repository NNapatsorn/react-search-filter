import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [word, setWord] = useState("");
  const [dataFilter] = useState(["capital"]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  const searchCountries = (countries) => {
    return countries.filter((item) => {
      return dataFilter.some((filter) => {
        if (item[filter]) {
          return (
            item[filter].toString().toLowerCase().indexOf(word.toLowerCase()) >
            -1
          );
        }
      });
    });
  };

  return (
    <>
      <div className='container'>
        <div className='search-container'>
          <label htmlFor='Search form'>
            <input
              type='text'
              name=''
              id=''
              className='search-input'
              placeholder='Search Country'
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
          </label>
        </div>
        <ul className='row'>
          {searchCountries(countries).map((item, index) => {
            return (
              <>
                <li key={index}>
                  <div className='card'>
                    <div className='card-title'>{item.flag}</div>
                    <div className='card-body'>
                      <div className='description'>
                        <h2>{item.name.official} </h2>
                        <ol className='card-list'>
                          <li>Capital : {item.capital}</li>
                          <li>Population : {item.population}</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
