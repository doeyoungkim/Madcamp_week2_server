const mongoose = require('mongoose');

// Define Schemes
const contactsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone_number: { type: String, required: true },
  address: { type: String, required: true },
  company: { type: String, required: true },
  job: { type: String, required: true }
},
{
  timestamps: true
});

contactsSchema.statics.create = function (payload) {
    // this === Model
    const todo = new this(payload);
    // return Promise
    return todo.save();
  };
  
  // Find All
  contactsSchema.statics.findAll = function () {
    // return promise
    // V4부터 exec() 필요없음
    return this.find({});
  };
  
//   // Find One by todoid
//   contactsSchema.statics.findOneByTodoid = function (todoid) {
//     return this.findOne({ todoid });
//   };
  
//   // Update by todoid
//   contactsSchema.statics.updateByTodoid = function (todoid, payload) {
//     // { new: true }: return the modified document rather than the original. defaults to false
//     return this.findOneAndUpdate({ todoid }, payload, { new: true });
//   };
  
//   // Delete by todoid
//   contactsSchema.statics.deleteByTodoid = function (todoid) {
//     return this.remove({ todoid });
//   };

// Create Model & Export
module.exports = mongoose.model('Contacts', contactsSchema);