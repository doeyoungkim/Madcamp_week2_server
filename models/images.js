const mongoose = require('mongoose');

// Define Schemes
const imagesSchema = new mongoose.Schema({
  imageID : { type: String, required: true }
},
{
  timestamps: true
});

imagesSchema.statics.create = function (payload) {
    // this === Model
    const image = new this(payload);
    // return Promise
    return image.save();
  };
  
  // Find All
  imagesSchema.statics.findAll = function () {
    // return promise
    // V4부터 exec() 필요없음
    return this.find({});
  };
  // Create Model & Export
  module.exports = mongoose.model('Images', imagesSchema);