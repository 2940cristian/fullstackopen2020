import axios from "axios"

const baseUrl = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ?
 "http://localhost:3001/api/persons"
 : 
 "https://polar-ridge-80491.herokuapp.com/api/persons"


const createPerson = (newPerson) => {
    return axios.post(baseUrl, newPerson)
    .then(res => {
      console.log(res, "person service");
      return res
    }).catch(err => {
      console.log("HIT IT", err)
      return {err}})
}

const getAllPersons = () => {
  return axios.get(baseUrl)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const editPersonNumber = (id, editedPart) => {
  return axios.put(`${baseUrl}/${id}`, editedPart)
}


  export default {createPerson, getAllPersons, deletePerson, editPersonNumber}