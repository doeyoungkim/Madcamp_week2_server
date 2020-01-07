const router = require('express').Router();
const Images = require('../models/images');
  

router.get('/', (req, res) => {
    Images.findAll()
    .then(data =>{
        res.json(data);
    })
    .catch(err => res.status(500).send(err))
})

module.exports = router;