import React, {useState, useEffect} from 'react';
import FindCountry from "./components/FindCountry";
import axios from "axios";


function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false)
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all")
    .then(res => {
      setCountries(res.data)
    })
  }, [])

  const  handleInputChange = (e) => {
    const value = e.target.value
    const temp = countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase()))
    setFilteredCountries(temp);
    setIsFiltered(true)
    }

  return (
    <div className="App">
      <FindCountry changeCountry={setFilteredCountries} countries={isFiltered ? filteredCountries : null} function={handleInputChange}/>
    </div>
  );
}

export default App;
