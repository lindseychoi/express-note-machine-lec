const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

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
    };

    readAndAppend(newNotes, './db/db.json');
    res.json(`Note added successfully 🚀`);

  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;
