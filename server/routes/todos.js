var express = require('express');
var router = express.Router();

const todos = [{ id: '1', title: 'First todo', completed: false}];

// TODO: Error handling
// TODO: convert to typescript to make this SAFER

/* READ todos. */
router.get('/', function(req, res, next) {
  res.send(todos);
});

/* READ individual todo. */
router.get('/:id', function(req, res, next) {
  res.send(todos.filter(entry => entry.id === req.params.id));
});

/* CREATE individual todo. */
router.post('/', function(req, res, next) {
  const newEntry = { ...req.body, id: Date.now().toString() };
  todos.push(newEntry);
  console.log(todos);
  res.send(newEntry);
});

/* UPDATE individual todo. */
router.put('/:id', function(req, res, next) {
  const currentEntry = todos.find(entry => entry.id === req.params.id);
  const updatedEntry = { ...currentEntry, ...req.body };
  todos.splice(todos.indexOf(currentEntry), 1, updatedEntry);
  res.send(updatedEntry);
});

module.exports = router;
