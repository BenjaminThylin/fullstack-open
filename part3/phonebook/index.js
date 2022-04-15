const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
var morgan = require('morgan')

// create application/json parser
const jsonParser = bodyParser.json()

app.use(cors())
app.use(express.static('build'))

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },
    {
        "id": 5,
        "name": "Benni",
        "number": "39-23-642452"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
    morgan('tiny')
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).send(`No person found with id matching ${id}`)
    }
})

app.post('/api/persons', jsonParser, (request, response) => {
    const body = request.body
    const nameDuplicate = persons.some(p => p.name === body.name)

    if (!body.name) {
        return response.status(400).json({
            error: 'Name is missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'Number is missing'
        })
    } else if (nameDuplicate) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = {
        id: Math.floor(Math.random() * 10000),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get('/info', (request, response) => {
    let amountPersons = persons.length
    let currentTime = new Date();
    response.send(`
        <p>Phonebook has info for ${amountPersons} people</p>
        <p>${currentTime}</p>
    `)
})

const PORT = process.env.PORT || 3003
app.listen(PORT)
console.log(`Server running on port ${PORT}`)