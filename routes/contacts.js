const router = require('express').Router();
const Contacts = require('../models/contacts');

// 안드로이드에서 새로운 연락처 추가하는 기능 추가될때 필요한 코드들
// router.post('/', (req, res) => {
//     console.log("hi android");
//     Contacts.deleteMany({})
//       .then(promise =>{
//         if(!promise.ok)
//           return;
//         console.log("deleted :", promise.deletedCount);
//         return initData(req.body.values); 
//       })
//       .then((data)=>{
//         console.log(data)
//         Contacts.find({})
//         .then((data) => {
//           if (!data.length) {
//             console.log("data not found")
//             return res.status(404).send({ err: 'data not found' });
//           }
//           console.log(data.length);
//           console.log(`successful : ${data}`)
//           res.send(`find successfully: ${data}`);
//         })
//       })
//     .catch(err => res.status(500).send(err));
// })
  

// Create new todo document
router.get('/', (req, res) => {
  console.log("/contacts reached!");
  Contacts.find({})
    .then(data => {
      console.log(data);
      res.json(JSON.stringify(data));
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    });
  // res.json(req.body);
  // Contacts.create(req.body)
  //   .then(data => res.send(data))
  //   .catch(err => res.status(500).send(err));
});

// router.get('/:name', (req, res) => {
//   Contacts.find({"name": req.params.name})
//   // res.json(req.body);
//   // Contacts.create(req.body)
//   //   .then(data => res.send(data))
//   //   .catch(err => res.status(500).send(err));
// });
  

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