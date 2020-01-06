const router = require('express').Router();

const Contacts = require('../models/contacts');
const Images = require('../models/images');

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
        return await Contacts.find({}) // 동기적 프로그래밍 위해서
    } 
  }
  
router.post('/', (req, res) => {
    console.log("hi android");
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