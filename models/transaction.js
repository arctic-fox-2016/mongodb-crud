var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var transactionSchema = new Schema({
  "memberid": String,
  "days": String,
  "out_date": Date,
  "due_date": Date,
  "in_date": Date,
  "fine": Number,
  "booklist": {
    "type": Array,
    "isbn": String,
    "qty": Number
  }
});

var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
