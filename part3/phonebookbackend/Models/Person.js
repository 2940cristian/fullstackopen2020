const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    number: {
        type: String,
        required: true,
        minlength: 8,
        unique: false
    },
    // id: Number
})

personSchema.plugin(uniqueValidator)

personSchema.set("toJSON", {
    transform: (document, returnedPerson) => {
        returnedPerson.id = returnedPerson._id.toString();
        delete returnedPerson._id
        delete returnedPerson.__v
    }
})
const Person = mongoose.model("Person", personSchema);

module.exports = Person;