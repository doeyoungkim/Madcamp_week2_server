const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');
const crypto = require('crypto');

const Images = require('../models/images');
  
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb){
        return crypto.pseudoRandomBytes(16, function(err, raw){
            return err ? cb(err) : cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
        })
    }
})
router.get('/', (req, res) => {
    file = req.params.upload;
    console.log(file);
    var img = fs.readFileSync(__dirname + "../uploads" + file);
    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(img, 'binary');
    console.log("hi android")
    .catch(err => res.status(500).send(err))
})

module.exports = router;