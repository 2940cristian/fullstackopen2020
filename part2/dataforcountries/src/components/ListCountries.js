import React from "react";
import SingleCountry from "./SingleCountry"
const ListCountries = (props) => {
    const filteredCountries = props.countries;
    const setFilteredCountry = props.changeCountry;
    
    const handleClick = (country) => {
        const temp = [];
        temp.push(country);
        setFilteredCountry(temp)
    }

    return (
        <ul>
            {filteredCountries.length === 1 ? 
            <SingleCountry country={filteredCountries[0]}/>
            :
            filteredCountries.map(country => {
                return (
                    <li key={country.name}>{country.name} <button onClick={() => {
                        handleClick(country)
                    }}>Show</button></li>
                )
            })
            }
        </ul>
    )
}

export default ListCountries