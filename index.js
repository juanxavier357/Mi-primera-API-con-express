const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const port = 3001
let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: 4,
        name: 'Mary Poppendick',
        number: '39-23-6423122'
    }
]

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan(':date[iso] :method :url :http-version :user-agent :status (:response-time ms)'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.listen(port, () => {
    console.log(`Server running al http://localhost:${port}`)
})

// 1.1: Backend de la agenda telefonica, paso 1

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// 1.2: Backend de la agenda telefonica, paso 2

const hour = new Date()

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people <br/><br/> ${hour}`)
})

// 1.3: Backend de la agenda telefonica, paso 3

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }

})

// 1.4: Backend de la agenda telefonica, paso 4

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// 1.5: Backend de la agenda telefonica, paso 5

app.post('/api/persons', (request, response) => {
    let id = Math.round(Math.random() * 100)
    let name = request.body.name
    let number = request.body.number
    let cont = 0
    // 1.6: Backend de la agenda telefonica, paso 6
    if (!name || !number) {
        return response.status(400).json({
            error: 'Falta el nombre o el número'
        })
    }

    persons.find(element => {
        if (name === element.name) {
            cont++
        }
    });

    if (cont > 0) {
        return response.status(400).json({
            error: 'El nombre ya existe en la agenda'
        })
     } else {
        persons.push({ id, name, number })
        response.json(persons)
    }
})

// 1.7: Backend de la agenda telefonica, paso 7

app.get('/health', (request, response) => {
            const healthResponse = {
                statusCode: 200,
                message: 'ok'
            }

            response.json(healthResponse)
        })

// 1.8: Backend de la agenda telefonica, paso 8

app.post('/api/login', (request, response) => {
            const user = { id: 3 }
            const token = jwt.sign({ user }, 'my_secret_key')
            response.json({
                token
            })
        })

app.get('/api/protected', ensureToken, (request, response) => {
            response.json({
                text: 'protected'
            })
        })

function ensureToken(request, response, next) {
                request.headers['authorization']
                console.log(bearerHeader)
                if (typeof bearerheader !== 'undefined') {
                    const bearer = bearerHeader.split(" ")
                    const bearerToken = bearer[1]
                    request.token = bearerToken
                    next()
                } else {
                    response.sendStatus(403)
                }
            }
