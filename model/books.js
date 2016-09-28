var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var bookSchema = new Schema({
  isbn: String,
  title: String,
  author: String,
  category: String,
  stock: Number,
  created_at: Date,
  updated_at: Date
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
