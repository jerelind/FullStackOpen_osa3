const mongoose = require('mongoose')

const url = 'mongodb://jerelind:jere7158#@ds151892.mlab.com:51892/puhelinmuistio'

mongoose.connect(url)

const Note = mongoose.model('Note', {
    name: String,
    number: String
})

module.exports = Note