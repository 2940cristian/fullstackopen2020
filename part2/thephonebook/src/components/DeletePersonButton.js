import React from "react";
import personServices from "../services/personsServices"

const DeletePersonButton = (props) => {
    const id = props.id
    const setPersons = props.stateNeeded

    async function onDelete (id) {
        if(window.confirm("Do you want to delete this person?")) {
        const deleting = await personServices.deletePerson(id)
        let tempPersons = await personServices.getAllPersons()
        return deleting & setPersons(tempPersons.data)
        }
        else return null;
    }
    
    return (
        <button onClick={() => {
            onDelete(id)
        }} style={{marginLeft:"1rem", height:"fit-content"}}>Delete</button>
    )
}

export default DeletePersonButton;