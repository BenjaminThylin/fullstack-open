require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")
var morgan = require("morgan")
const Person = require("./models/person")

// create application/json parser
const jsonParser = bodyParser.json()

app.use(cors())
app.use(express.static("build"))

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"), "-",
        tokens["response-time"](req, res), "ms",
        JSON.stringify(req.body)
    ].join(" ")
}))

app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>")
})

app.get("/api/persons", (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
    morgan("tiny")
})

app.get("/info", (request, response) => {
    Person.find({}).then(person => {
        response.send(`
            <p>Phonebook has info for ${person.length} people</p>
            <p>${new Date()}</p>
        `)
    })
})

app.get("/api/persons/:id", (request, response, next) => {
    const id = Number(request.params.id)
    Person.findById(id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post("/api/persons", jsonParser, (request, response, next) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).send("Name is missing")
    } else if (!body.number) {
        return response.status(400).json("Number is missing")
    }

    const person = new Person({
        id: Math.floor(Math.random() * 10000),
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put("/api/persons/:id", jsonParser, (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, {new : true})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

/* const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint) */

const errorHandler = (error, request, response, next) => {
    if (error.name == "CastError") {
        return response.status(400).send({ error: "Malformatted id" })
    } else if (error.name === "ValidationError") {
        console.log(error.message)
        return response.status(400).send(error.message)
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3003
app.listen(PORT)
console.log(`Server running on port ${PORT}`)