import React from "react"
import personService from "../services/personsServices"

const AddPerson = (props) => {
    const states = props.statesNeeded;

    const handleInputChange = (setter, e) => {
        setter(e.target.value)
    }

    const getAllAfterAction = async (message) => {
        const tempPersons = await personService.getAllPersons();
        const handleStateChange = await states.setPersons(tempPersons.data);
        states.setNewNumber("");
        states.setNewName("");
        states.setSuccessMessage(message);
        states.setIsShown(!states.shown);
        setTimeout(() => {
            states.setIsShown(states.shown)   
        }, 3000)
    }

    async function addPerson (e) {
        e.preventDefault();
        const newPersonObject = {
            name: states.newName,
            number: states.newNumber
        }
        const isFound = states.persons.some(person => person.name.toLowerCase() === newPersonObject.name.toLowerCase())
        if (isFound) return editNumber(newPersonObject)
        else  {
        let creating = await personService.createPerson(newPersonObject)
        if(creating.err) {
        states.setSuccessMessage("Must have 8 characters for name and 3 for Number");
        states.setIsShown(!states.shown);
        setTimeout(() => {
            states.setIsShown(states.shown)   
        }, 3000)
        }
        else getAllAfterAction(`${states.newName} has been aadded to phonebook`)
        }
    }

    const editNumber = async (person) => {
        if (window.confirm(`${person.name} already exists, would you like to change the number?`)) {
            const findId = states.persons.find(person => person.name.toLowerCase() === states.newName)
            const editing = await personService.editPersonNumber(findId.id, person)
            .then(res => {return true})
            .catch(err => {return false})
            console.log(editing)
            if(editing) {
                getAllAfterAction(`${person.name}'s number has been changed`)
            }
            else {
                states.setSuccessMessage(`error, ${person.name} has already been deleted`);
                states.setIsShown(!states.shown);
                setTimeout(() => {
                    states.setIsShown(states.shown)   
                }, 3000)
            }
        }
    }


    return (
    <form onSubmit={addPerson}>
        <div>
            <h2>Add A New</h2>
            name: <input required type="text" onChange={(e) => {handleInputChange(states.setNewName, e)}} value={states.newName} />
            number: <input required type="number" onChange={(e) => {handleInputChange(states.setNewNumber, e)} } value={states.newNumber}  />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    )
}


export default AddPerson