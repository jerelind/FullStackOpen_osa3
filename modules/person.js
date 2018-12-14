const mongoose = require('mongoose')

const url = 'mongodb://muistio:muistio1@ds121652.mlab.com:21652/muistio'

mongoose.connect(url)

const Note = mongoose.model('Note', {
    name: String,
    number: String
})

module.exports = Note