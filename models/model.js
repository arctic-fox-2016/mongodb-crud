let mongoose = require("mongoose")
let Schema = mongoose.Schema
mongoose.connect('localhost:27017/crud')

let customersSchema = new Schema({
  name: String,
  memberid: String,
  address: String,
  zipcode: String,
  phone: String
})

let booksSchema = new Schema({
  isbn: String,
  title: String,
  author: String,
  category: String,
  stock: Number
})

let transactionsSchema = new Schema({
  memberid: String,
  days: Number,
  out_date: Date,
  due_date: Date,
  in_date: Date,
  fine: Number,
  booklist: {
    type: Array,
    isbn: {type: String},
    qty: {type: Number}
  }
})

let Customers = mongoose.model('customers', customersSchema)
let Books = mongoose.model('books', booksSchema)
let Transactions = mongoose.model('transactions', transactionsSchema)

module.exports = {Customers, Books, Transactions}
