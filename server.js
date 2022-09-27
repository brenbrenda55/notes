3.06 KiB
const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./db/db.json')

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
      JSON.stringify({ notes: notessArray }, null, 2)
    );
    return note;
  };


  app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });
  
  app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });
  
  app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notess.length.toString();
  
    if (!validateAnimal(req.body)) {
      res.status(400).send('The note is not properly formatted.');
    } else {
      const note = createNewnote(req.body, notes);
      res.json(animal);
    }
  });
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
  
  

  app.delete('api/notes/:id', (req, res) => {
    
  }
  )
  









app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
  