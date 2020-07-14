import React from "react";
import DeletePersonButton from "./DeletePersonButton";

const ListPersons = (props) => {
    const states = props.statesNeeded
    return (
        <div>
            <h2>Numbers</h2>
            {states.checkPerson.length < 1 ? 
            states.persons.map(person => {
            return (
            <div key={person.name} style={{display: "flex", alignItems: "center"}}>
            <p>{person.name} {person.number}</p>
            <DeletePersonButton stateNeeded={states.setPersons} id={person.id}/>
            </div>
            )
            }) : 
            states.filteredPersons.map(filteredPerson => {
            return (
            <p key={filteredPerson.name}>{filteredPerson.name} {filteredPerson.number}</p>
            )
            })
            }
        </div>
    )
}

export default ListPersons