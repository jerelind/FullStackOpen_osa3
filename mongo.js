const mongoose = require('mongoose')

const url = 'mongodb://muistio:SALASANA@ds151892.mlab.com:51892/puhelinmuistio'

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Note = mongoose.model('Note', noteSchema);
  
if(process.argv.length <= 2) {
    Note
        .find({})
        .then(response => {
            console.log("Puhelinluettelo:")
            response.forEach(note => {
                console.log(note.name, note.number);
            });
            mongoose.connection.close();
        });
} else if(process.argv.length >= 4) {
    const note = new Note({
        name: process.argv[2],
        number: process.argv[3]
    });

    note
        .save()
        .then(response => {
            console.log(`Lisätään henkilö ${note.name} numero ${note.number} luetteloon`);
        mongoose.connection.close()
        })
    }
