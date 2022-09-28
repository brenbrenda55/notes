const fs = require('fs');
const path = require('path');
const express = require('express');
let  notes  = require('./db/db.json')
const { v4: uuidv4 } = require('uuid');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray) 
        );
    return note;
};


app.get('/api/notes', (req, res) => {
    let results = notes;
    
    res.json(results);
});



app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    console.log(req.body)
    req.body.id = uuidv4();
    console.log(req.body)

        const note = createNewNote(req.body, notes);
        res.json(note);
    
});



app.delete('/api/notes/:id', (req, res) => {
    console.log (req.params.id)
    notes = notes.filter (note => note.id !== req.params.id )
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes) 
        );

        res.json(notes)
}
)



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
