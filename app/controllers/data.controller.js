  const Model = require('../models/library')

  module.exports = {
      showLibrary        : showLibrary,

      showBook           : showBook,
      showAddBook        : showAddBook,
      processAddBook     : processAddBook,
      showEditBook       : showEditBook,
      processEditBook    : processEditBook,
      deleteBook         : deleteBook,

      showCustomer       : showCustomer,
      showAddCustomer    : showAddCustomer,
      processAddCustomer : processAddCustomer,
      showEditCustomer   : showEditCustomer,
      processEditCustomer: processEditCustomer,
      deleteCustomer     : deleteCustomer,

  }

  function showLibrary(req, res) {
      Model.Book.find({}, (err, results) => {
          var books = results

          Model.Customer.find({},(err,results) => {
            var customers = results

            res.render('pages/library', {
              books  : books, customers: customers
            })
          })
      })
  }

  //delete book
  function deleteBook(req, res) {
      Model.Book.remove({ _id: req.params.id }, (err) => {
          res.redirect('/library')
      })
  }

  //edit book
  function showEditBook(req, res) {
      Model.Book.findOne({ _id: req.params.id }, (err, book) => {
          res.render('pages/editbook', {
              book  : book
          })
      })
  }

  function processEditBook(req, res) {

      //finding a current book
      Model.Book.findOne({ _id: req.params.id }, (err, book) => {
          //update the book
          book.isbn     = req.body.isbn
          book.title    = req.body.title
          book.author   = req.body.author
          book.category = req.body.category
          book.stock    = req.body.stock

          book.save((err) => {
              if (err)
                  throw err;

              res.redirect('/library')
          })
      })
  }

  //add book
  function showAddBook(req, res) {
      res.render('pages/addbook')
  }

  function processAddBook(req, res) {

      var book = new Model.Book({
          isbn    : req.body.isbn,
          title   : req.body.title,
          author  : req.body.author,
          category: req.body.category,
          stock   : req.body.stock
      })

      book.save((err) => {
          if (err)
              throw err

          res.redirect(`/library/books/${book._id}`)
      })
  }

  //show book
  function showBook(req, res) {
      Model.Book.findOne({ _id: req.params.id }, (err, book) => {
          if (err) {
              res.status(404)
              res.send('Book not found!')
          }

          res.render('pages/singlebook', {
              book: book
          })
      })
  }

//=====================================================================

//delete customer
  function deleteCustomer(req, res) {
      Model.Customer.remove({ _id: req.params.id }, (err) => {
          res.redirect('/library')
      })
  }

  //edit customer
  function showEditCustomer(req, res) {
      Model.Customer.findOne({ _id: req.params.id }, (err, customer) => {
          res.render('pages/editcustomer', {
              customer  : customer
          })
      })
  }

  function processEditCustomer(req, res) {

      //finding a current customer
      Model.Customer.findOne({ _id: req.params.id }, (err, customer) => {
          //update the customer
          customer.name     = req.body.name
          customer.memberid = req.body.memberid
          customer.address  = req.body.address
          customer.zipcode  = req.body.zipcode
          customer.phone    = req.body.phone

          customer.save((err) => {
              if (err)
                  throw err;

              res.redirect('/library')
          })
      })
  }

  //add customer
  function showAddCustomer(req, res) {
      res.render('pages/addcustomer')
  }

  function processAddCustomer(req, res) {
      var customer = new Model.Customer({
          name    : req.body.name,
          memberid: req.body.memberid,
          address : req.body.address,
          zipcode : req.body.zipcode,
          phone   : req.body.phone
      })

      customer.save((err) => {
          if (err)
              throw err

          res.redirect(`/library/customers/${customer._id}`)
      })
  }

  //show customer
  function showCustomer(req, res) {
      Model.Customer.findOne({ _id: req.params.id }, (err, customer) => {
          if (err) {
              res.status(404)
              res.send('Customer not found!')
          }

          res.render('pages/singlecustomer', {
              customer: customer
          })
      })
  }