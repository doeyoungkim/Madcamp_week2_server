const router = require('express').Router();
const Images = require('../models/images');
  

router.get('/', (req, res) => {
    console.log("/images reached!");
    Images.findAll()
    .then(data =>{
        res.json(JSON.stringify(data));
    })
    .catch(err => res.status(500).send(err))
})

module.exports = router;