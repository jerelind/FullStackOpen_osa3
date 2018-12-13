const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

let persons = [
    {
        name: 'Arto Hellas',
        number: '040-123456',
        id: 1
    },
    {
        name: 'Martti Tienari',
        number: '040-123456',
        id: 2
    },
    {
        name: 'Arto Järvinen',
        number: '040-123456',
        id: 3
    },
    {
        name: 'Lea Kutvonen',
        number: '040-123456',
        id: 4
    }
]

app.use(express.static('build'))

app.use(cors())

app.use(bodyParser.json())

app.use(morgan('tiny'))

const generateId = () => {
    const maxId = persons.length > 0 ? persons.map(p => p.id).sort((a,b) => a - b).reverse()[0] : 1
    return maxId + Math.floor(Math.random() * Math.floor(1000))
}

app.post('/persons', (req, res) => {
    const body = req.body
    
    if(body.name === "" || body.number === "" || persons.map(p => p.name).includes(body.name)) {
        return res.status(400).json({error: 'Name must be unique'})
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    res.json(person)
})

app.get('/', (req, res) => {
    res.send('<h1>Puhelinluettelo</h1>')
})

app.get('/info', (req, res) => {
    res.send('<p>Puhelinluettelossa ' + persons.length + ' henkilön tiedot</p>' + Date())
})

app.get('/persons', (req, res) => {
    res.json(persons)
})

app.get('/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id) 

    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })