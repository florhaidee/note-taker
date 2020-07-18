const router = require('express').Router();
const { filterByQuery, findById, createNewNote, validateNote, deleteNote } = require('../../lib/notes');
let { notes } = require('../../data/notes');

//get notes by query
router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//get notes by id
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});
//post data (note) to server
router.post('/notes', (req, res) => {
    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
      res.status(400).send('The note is not properly formatted.');
    } else {
      const note = createNewNote(req.body, notes);
      res.json(note);
    }
});
// request to delete a note by id
router.delete('/notes/:id', (req, res) => {
  console.log('delete id', req.params.id)
  const newArray = deleteNote(req.params.id, notes);
    if (newArray) {
      res.json(newArray);
      notes = newArray;
    } else {
      res.send("Couldn't delete note");
    }
});

module.exports = router;