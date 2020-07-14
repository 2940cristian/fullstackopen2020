import React, { useState, useEffect } from 'react'
import SearchPerson from "./components/SearchPerson"
import AddPerson from "./components/AddPerson"
import ListPersons from "./components/ListPersons"
import personService from "./services/personsServices"
import SuccessMessagePrompt from "./components/SuccessMessage"

const App = () => {
  //Variables
  const [ persons, setPersons ] = useState([]) 
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [checkPerson, setCheckPerson] = useState("")
  const [ newName, setNewName ] = useState('');
  const [newNumber, setNewNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("Yay");
  const [isShown, setIsShown] = useState(false)
//Data Fetching
useEffect(() => {
  personService.getAllPersons()
  .then(res => {
    setPersons(res.data)
  })
}, [])

console.log("lol")

  //View
  return (
    <div>
      <h2>Phonebook</h2>
      {isShown ? <SuccessMessagePrompt message={successMessage}/> : null}
      <SearchPerson statesNeeded={{setCheckPerson, persons, checkPerson, setFilteredPersons}}/>
      <AddPerson statesNeeded={{persons, setPersons, setNewName, newName, setNewNumber, newNumber, setSuccessMessage, isShown, setIsShown}}/>
      <ListPersons statesNeeded={{checkPerson, persons, filteredPersons, setPersons}} />
    </div>
  )
}

export default App
