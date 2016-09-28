var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  isbn: String,
  title: String,
  author: String,
  category: String,
  stock: Number,
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Books = mongoose.model('Books', userSchema);

// make this available to our users in our Node applications
module.exports = Books;
