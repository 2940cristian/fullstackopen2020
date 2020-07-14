import React, {useState, useEffect} from "react";
import axios from "axios";

const SingleCountry = (props) => {
    const [countryWeather, setCountryWeather] = useState([])
    const countryData = props.country;


    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_APIKEY}&query=${countryData.name}`)
        .then(res => {
            setCountryWeather(res.data)
        })
    })

    console.log(countryWeather)

    return (
    <div>
        <h2>{countryData.name}</h2>
        <p>Capaital: {countryData.capital}</p>
        <p>population is:  {countryData.population}</p>
        <h3>Languages</h3>
        <ul>
            {countryData.languages.map(language => {
                return (
                <li key={language.name}>{language.name}</li>
                )
            })}
        </ul>
        <img alt={`${countryData.name}`} width="200px" height="200px" src={countryData.flag}/>

        {countryWeather.length < 1 ? null 
        : 
        <>
        <h2>Weather in {countryData.name}</h2>
        <img alt="weather icon"  width="100px" height="100px" src={countryWeather.current.weather_icons[0]}/>
        <p>temperature: {countryWeather.current.temperature}</p>
        <p>wind speed: {countryWeather.current.wind_speed}</p>
        </>
        }
    </div>
    )
}

export default SingleCountry