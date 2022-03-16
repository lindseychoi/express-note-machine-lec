const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/notes.js');


const PORT = 3001;




//middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/', api);
// app.use('/notes', notesRouter);

app.use(express.static('public'));

//GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET Route for the notes html page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//listening on port 3001 (variable at top is PORT)
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
