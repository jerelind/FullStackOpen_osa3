const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./modules/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

const formatNote = (note) => {
    return {
        name: note.name,
        number: note.number,
        id: note._id
    }
}

app.post('/persons', (req, res) => {
    const body = req.body
    
    if(body.name === undefined || body.number === undefined) {
        return res.status(400).json({error: 'Name must be unique'})
    }

    const note = new Note({
        name: body.name,
        number: body.number
    })

    Note
        .findOne({name: body.name})
        .then(result => {
            if(result) {
                return res.status(405).json({error: 'Name already in the phonebook'})
            } else {
        note
            .save()
            .then(savedNote => {
                res.json(formatNote(savedNote))
            })
            }
        })
})

app.get('/', (req, res) => {
    res.send('<h1>Puhelinluettelo</h1>')
})

app.get('/info', (req, res) => {
    Note
        .find({})
        .then(notes => res.send(
        `<p>Puhelinluettelossa ${notes.length} henkilön tiedot </p>
        <p>${new Date()}</p>`
        ))
})

app.get('/persons', (req, res) => {
    Note
        .find({})
        .then(notes => {
            res.json(notes.map(formatNote))
        })
})

app.get('/persons/:id', (req, res) => {
    Note
        .findById(req.params.id)
        .then(note => {
            if(note) {
                res.json(formatNote(note))
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({error: 'Malformatted id'})
        })
})

app.delete('/persons/:id', (req, res) => {
    Note
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({error: 'Malformatted id'})
        })
})
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })