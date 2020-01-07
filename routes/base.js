const router = require('express').Router();

const Contacts = require('../models/contacts');
const Images = require('../models/images');


async function isSavedOk(){
    var saved_contacts = await Contacts.findAll()
    var saved_images = await Images.findAll()
    console.log(saved_contacts.length, saved_images.length)
        if(saved_contacts.length > 0 && saved_images.length > 0){
            data = saved_contacts + saved_images
            console.log(`successful!`, data);
            return true;
            // res.send(`find successfully: ${data}`);
        }
        else{
            console.log("data not found")
            return false;
            // return res.status(404).send({ err: 'data not found' });
        }
}

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
    var contacts = data.contacts.values
    await contacts.forEach(element => {
        Contacts.create({
            name : element.nameValuePairs.name,
            phone_number : element.nameValuePairs.phone_number
        })
    })
    var images = data.images.values
    await images.forEach(element => {
        Images.create({
            imageID: element.nameValuePairs.id
        })
    })
    await Contacts.find({}) // 동기적 프로그래밍 위해서
  }
  
router.post('/', (req, res) => {
    console.log("hi android");
    initData(req.body.nameValuePairs)
    .then(()=>{
        if(isSavedOk())
            res.send(`saved successfully`)
        else
            res.status(404).send({ err: 'data not found' })
    })
    .catch(err => res.status(500).send(err));
    })
router.use('/contacts', require('../routes/contacts.js'));
router.use('/images', require('../routes/images.js'));
module.exports = router