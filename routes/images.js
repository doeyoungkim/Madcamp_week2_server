const router = require('express').Router();

const Images = require('../models/images');
  
router.post('/', (req, res) => {
    console.log("hi android");
    Images.deleteMany({})
    .then((data)=>{
        console.log(data)
        Images.find({})
        .then((data) => {
        if (!data.length) {
            console.log("data not found")
            return res.status(404).send({ err: 'data not found' });
        }
        console.log(data.length);
        console.log(`successful : ${data}`)
        res.send(`find successfully: ${data}`);
        })
    })
    .catch(err => res.status(500).send(err));
})

module.exports = router;