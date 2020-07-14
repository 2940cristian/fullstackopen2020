import React from "react"

const SearchPerson = (props) => {
    const states = props.statesNeeded


    const handleChangeFilter = (e) => {
        states.setCheckPerson(e.target.value);
        const temp = states.persons.filter((person) => person.name.toLowerCase().includes(states.checkPerson.toLowerCase()));
        states.setFilteredPersons(temp);
      }

    return (
        <input onKeyDown={(e) => e.keyCode === 8 ? handleChangeFilter : null} onChange={handleChangeFilter} type="text"/>
    )
}

export default SearchPerson