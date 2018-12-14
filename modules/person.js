const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)

const Note = mongoose.model('Note', {
    name: String,
    number: String
})

module.exports = Note