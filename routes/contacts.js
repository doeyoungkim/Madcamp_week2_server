const router = require('express').Router();
const Contacts = require('../models/contacts');

// test
router.get('/', (req, res) => {
    res.send('welcome');
});

// Create new todo document
router.post('/contacts', (req, res) => {
    res.send("post succeed");
    // res.json(req.body);
    // Contacts.create(req.body)
    //   .then(data => res.send(data))
    //   .catch(err => res.status(500).send(err));
  });
  

// // Find One by todoid
// router.get('/contacts/:todoid', (req, res) => {
//   Todo.findOneByTodoid(req.params.todoid)
//     .then((todo) => {
//       if (!todo) return res.status(404).send({ err: 'Todo not found' });
//       res.send(`findOne successfully: ${todo}`);
//     })
//     .catch(err => res.status(500).send(err));
// });


// // Update by todoid
// router.put('/todoid/:todoid', (req, res) => {
//   Todo.updateByTodoid(req.params.todoid, req.body)
//     .then(todo => res.send(todo))
//     .catch(err => res.status(500).send(err));
// });

// // Delete by todoid
// router.delete('/todoid/:todoid', (req, res) => {
//   Todo.deleteByTodoid(req.params.todoid)
//     .then(() => res.sendStatus(200))
//     .catch(err => res.status(500).send(err));
// });

module.exports = router;