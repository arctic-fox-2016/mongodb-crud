const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a Schema
const bookSchema = new Schema({
  isbn    : String,
  title   : String,
  author  : String,
  category: String,
  stock   : Number
},{ collection: 'books' })

const customerSchema = new Schema({
  name    : String,
  memberid: String,
  address : String,
  zipcode : String,
  phone   : String
},{ collection: 'customers'})

const transactionSchema = new Schema({
  memberid: String,
  out_date: Date,
  due_date: Date,
  in_date : Date,
  fine    : Number,
  booklist: {
    type:Array,
    isbn:String,
    qty : Number
  }
})

//create the model
const Book = mongoose.model('Book', bookSchema)
const Customer = mongoose.model('Customer', customerSchema)
const Transaction = mongoose.model('Transaction', transactionSchema)

//export model
module.exports = {Book,Customer,Transaction}