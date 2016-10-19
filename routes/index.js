var express = require('express');
var router = express.Router();
var Book = require('../models/book')
var Customer = require('../models/customer')
var Transaction = require('../models/transaction')

/* GET home page. */
router.get('/', function(req, res, next) {
  Book.find({}, function(err, book) {
    if (err) throw err
    Customer.find({}, function(err, customer) {
      if (err) throw err
        res.render('index', {
          book: book,
          customer: customer
      });
    })
  })
});

router.get('/insert', function(req, res, next) {
  Book.find({}, function(err, book) {
    if (err) throw err
    Customer.find({}, function(err, customer) {
      if (err) throw err
      res.render('insert', {
        collection: req.query.collection,
        book: book,
        customer: customer
      })
    })
  })
});

router.post('/insert', function(req, res, next) {
  switch(req.body.collection) {

    // Books
    case "books":
      var book = new Book({
        "isbn": req.body.isbn,
        "title": req.body.title,
        "author": req.body.author,
        "category": req.body.category,
        "stock": req.body.stock
      });

      book.save(function(err) {
        if (err) throw err;
        res.redirect('/')
      });
    break

    // Customers
    case "customers":
      var customer = new Customer({
        "name": req.body.name,
        "memberid": req.body.memberid,
        "address": req.body.address,
        "zipcode": req.body.zipcode,
        "phone": req.body.phone
      });

      customer.save(function(err) {
        if (err) throw err;
        res.redirect('/')
      });
    break
  }
});

router.get('/update', function(req, res, next) {
  switch(req.query.collection) {

    // Books
    case "books":
      Book.find({_id: req.query._id}, function(err, book) {
        if (err) throw err;
        res.render('update', {
          collection: req.query.collection,
          book: book
        })
      });
    break

    // Customers
    case "customers":
      Customer.find({_id: req.query._id}, function(err, customer) {
        if (err) throw err;
        res.render('update', {
          collection: req.query.collection,
          customer: customer
        })
      });
    break
  }
});

router.post('/update', function(req, res, next) {
  switch(req.body.collection) {

    // Books
    case "books":
      Book.findByIdAndUpdate(req.body._id, {
        "isbn": req.body.isbn,
        "title": req.body.title,
        "author": req.body.author,
        "category": req.body.category,
        "stock": req.body.stock
      }, function(err, user) {
        if (err) throw err;
        res.redirect('/')
      });
    break

    // Customers
    case "customers":
      Customer.findByIdAndUpdate(req.body._id, {
        "name": req.body.name,
        "memberid": req.body.memberid,
        "address": req.body.address,
        "zipcode": req.body.zipcode,
        "phone": req.body.phone
      }, function(err, user) {
        if (err) throw err;
        res.redirect('/')
      });
    break
  }
});

router.post('/delete', function(req, res, next) {
  switch(req.body.collection) {

    // Books
    case "books":
      Book.findOneAndRemove({_id: req.body._id}, function(err) {
        if (err) throw err;
        res.redirect('/')
      });
    break

    // Customers
    case "customers":
      Customer.findOneAndRemove({_id: req.body._id}, function(err) {
        if (err) throw err;
        res.redirect('/')
      });
    break
  }
});

let convertToDate = (date) => {
  return date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
}

module.exports = router;
