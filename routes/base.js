const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');
const crypto = require('crypto');

const Contacts = require('../models/contacts');
const Images = require('../models/images');


const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb){
        return crypto.pseudoRandomBytes(16, function(err, raw){
            return err ? cb(err) : cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
        })
    }
})


async function initData(data){
    await Contacts.deleteMany({})
    .then(promise =>{
        if(!promise.ok)
        return;
        console.log("contacts deleted :", promise.deletedCount);
    })
    await Images.deleteMany({})
    .then(promise =>{
        if(!promise.ok)
        return;
        console.log("images deleted :", promise.deletedCount);
    })
    if(!data.length)
      return;
    else{
        data.forEach(element => {
            Contacts.create({
              name : element.nameValuePairs.name,
              phone_number : element.nameValuePairs.phone_number
            })
        })
        multer({
            storage: storage
          }).single('upload', function(req, res) {
            console.log(req.file);
            console.log(req.body);
            // res.redirect("/uploads/" + req.file.filename);
            console.log(req.file.filename);
            return res.status(200).end();
          });
        return await Contacts.find({}) // 동기적 프로그래밍 위해서
    } 
  }
  
router.post('/', (req, res) => {
    console.log("hi android");
    console.log(req.body)
    initData(req.body.values)
    .then(()=>{
        Contacts.find({})
        .then((data) => {
        if (!data.length) {
            console.log("data not found")
            return res.status(404).send({ err: 'data not found' });
        }
        console.log(`successful : ${data}`)
        res.send(`find successfully: ${data}`);
        })
    })
    .catch(err => res.status(500).send(err));
})

router.use('/contacts', require('../routes/contacts.js'));
router.use('/images', require('../routes/images.js'));
module.exports = router;