const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(cors())
app.use(express.json());

morgan.token('body', function getMethod (req, res) {
    return JSON.stringify(req.body)
})
const postMeth = morgan(`:method :url :status :res[content-length] :response-time ms :body`);


let persons = [
    {
        name: "Arto Hellas",
        number: "040-12356",
        id: 1
    },
    {
        name: "Mary Magdelan",
        number: "040-12356",
        id: 2
    },
    {
        name: "Lucifer Morningstar",
        number: "040-12356",
        id: 3
    },
    {
        name: "Dexter Morgan",
        number: "040-12356",
        id: 4
    }
]

const generateId = () => {
    const maxId = persons.length > 0 ?
    Math.max(...persons.map(n => n.id))
    : 0
    return maxId+1
}


app.get("/api/persons", (req, res) => {
    res.status(200).json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const personFound = persons.find(person => person.id === id)
    if(personFound) {
        res.status(200).json(personFound)
    }

    else {
        res.status(404).send({err: "Not found, person does not exist"})
    }
})

app.post("/api/persons", postMeth, (req, res) => {
    const newPerson = req.body
    const isFound = persons.some(n => n.name.toLowerCase() === newPerson.name.toLowerCase() )
    if(!newPerson.name || !newPerson.number || isFound) {
        res.status(400).send("Missing required parameters or person already exists")
    }
    else {
        const newPersonObject ={
            name: newPerson.name,
            number: newPerson.number,
            id: generateId()
        }
        persons = persons.concat(newPersonObject);
        res.status(200).json(persons)
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id)
    res.status(200).json(persons)
})

app.get("/info", (req, res) => {
    const numberOfPersons = persons.length
    const currDate = new Date().toString()
    res.status(200)
    res.send(
    `Phonebook has info for ${numberOfPersons} people
    <br/>
    ${currDate}
    `)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})