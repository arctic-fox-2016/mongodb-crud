// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var transactionSchema = new Schema({
	memberid: String,
	days: Number,
	out_date: Date,
	due_date: Date,
	in_date: Date,
	fine: Number,
	"booklist": [{
		"$ref": "isbn",
		"$id": "_id"
	}]
});

// the schema is useless so far
// we need to create a model using it
var Book = mongoose.model('Book', bookSchema);

// make this available to our users in our Node applications
module.exports = Book;
