require("dotenv").config()
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./Models/Person");

//CONNECTING TO DB
const url = process.env.DBURL
console.log(url)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("On server"))
.catch(err => console.log(err))
//

app.use(cors())
app.use(express.json());

morgan.token('body', function getMethod (req, res) {
    return JSON.stringify(req.body)
})
const postMeth = morgan(`:method :url :status :res[content-length] :response-time ms :body`);


const createPersonOnDb = async (person) => {
    const newPerson = new Person ({
        name: person.name,
        number: person.number
    })
    const result = await newPerson.save().then(res => {
        console.log(32)
        return res
    }).catch(err => {
        console.log(34)
        return err})

    return result
}

app.get("/api/persons", (req, res, next) => {
    Person.find({}).then(persons => {
        res.status(200).json(persons)
    })
    .catch(err => {
        next(err)
    })
})

app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id
    let personFound = undefined
    Person.find({}).then(person => {
        personFound = person.find(n => n.id === id);
        if(personFound) {
            res.status(200).json(personFound)
        }
    
        else {
            res.status(404).send({err: "Not found, person does not exist"})
        }
    }).catch(err => next(err))
})

app.post("/api/persons", postMeth, (req, res, next) => {
    const newPerson = req.body
    // const addedResult = await 
    createPersonOnDb(newPerson).then(response => {
        response._message ? 
        res.status(400).json({Err: response._message}) 
        :
         res.status(200).json({worked: "yes"})
        })
})

app.delete("/api/persons/:id", (req, res, next) => {
    const id = req.params.id
    Person.deleteOne({_id: id}).then(result => {
        console.log(result)
        res.status(200).json(result.deletedCount)
    }).catch(err => {
        next(err)
    })
})

app.put("/api/persons/:id",(req, res, next) => {
    const id = req.params.id
    const updatePerson = req.body
    Person.updateOne({_id: id}, updatePerson).then(result => {
        res.status(200).json(result.nModified)
    }).catch(err => next(err))
} )

app.get("/info", (req, res, next) => {
    let numberOfPersons = null
    Person.find({}).then(persons => {
        numberOfPersons =  persons.length;
        console.log(numberOfPersons)
        const currDate = new Date().toString()
        res.status(200)
        res.send(
        `Phonebook has info for ${numberOfPersons} people
        <br/>
        ${currDate}
        `)
    }).catch(err => {
        next(err)
    })
})



//ERROR
const errorHandler = (error, req, res, next) => {
    console.log("NAME:", error.name)
    switch (error.name) {
        case ("CastError"):
            return res.status(400).send({error: "Wrong id or not formatted correctly"})
        break;
        case("SyntaxError"):
            return res.status(400).send({error: "Missing name, number, or wrong formatting"})
        break
        case ("TypeError"):
            return res.status(400).json({error: "Person must have unique name with a name longer than 3 letters and a phone numberq"})
        break
        default: res.status(400).send("Error")
    }
    next(error)
}

app.use(errorHandler)



const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})