const router = require('express').Router();
const { filterByQuery, findById, validateNote } = require('../../lib/notes');
const { notes } = require('../../data/notes');

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

module.exports = router;