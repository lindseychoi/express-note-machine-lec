const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for posting a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (title && text) {
    const newNotes = {
      title,
      text,
      id: uuid()
    };

    readAndAppend(newNotes, './db/db.json');
    res.json(`Note added successfully 🚀`);

  } else {
    res.error('Error in adding note');
  }
});

notes.delete('/:id', (req, res) => {
  const { id } = req.params;
  readFromFile('./db/db.json').then((data) => {
    data = JSON.parse(data);
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.id === id) {
        data.splice(index, 1);
        break
      }
    }
    writeToFile('./db/db.json', data);
    res.json(`Note deleted successfully 🚀`);
  })
});

module.exports = notes;
