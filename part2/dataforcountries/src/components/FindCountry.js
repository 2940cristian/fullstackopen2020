import React from "react";
import ListCountries from "./ListCountries"

const FindCountry = (props) => {
    const filteredCountries = props.countries
    return (
    <section>
        <p>Find Countries: <input onChange={(e) => props.function(e)}/></p>
        {props.countries === null || filteredCountries.length > 10 ? <p>Too many matches, specify another filter</p> :
        <ListCountries changeCountry={props.changeCountry} countries={filteredCountries}/>
        }
    </section>
    )
}

export default FindCountry;