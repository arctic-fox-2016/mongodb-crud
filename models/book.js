// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var bookSchema = new Schema({
	isbn: {
		type: String,
		required: true,
		unique: true
	},
	title: {
		type: String,
		required: true
	},
	author: String,
	category: String,
	stock: Number
});

// the schema is useless so far
// we need to create a model using it
var Book = mongoose.model('Book', bookSchema);

// make this available to our users in our Node applications
module.exports = Book;
