let express = require('express')
let mongoose = require('mongoose')
let router = express('router')
let bodyParser = require('body-parser')
let Model = require('../models/model.js')

router.use(bodyParser.urlencoded({extended:true}))
router.set('view-engine','ejs')

router.get('/transactions', function(req,res,next){
  mongoose.model('transactions').find(function(err, result){
    res.send(result)
  })
})

router.get('/books', function(req,res,next){
  mongoose.model('books').find(function(err, result){
    res.render('result.ejs', {books: result})
  })
})

router.get('/customers', function(req,res,next){
  mongoose.model('customers').find(function(err, result){
    res.send(result)
  })
})

//form transactions

router.get('/formtransaction', function(req,res,next){
  res.render('form.ejs')
})

router.post('/submitbooks', function(req,res,next){
  new Model.Books({isbn:req.body.isbn, title: req.body.title, author:req.body.author, category:req.body.category, stock: req.body.stock}).save(function(err, doc){
    if(err){
      res.send(error)
    } else {
      res.redirect('/books')
    }
  })
})

router.post('/submittransactions', function(req,res,next){
  new Model.Transactions({memberid: req.body.memberid, days: req.body.days, out_date: req.body.outdate, due_date: req.body.duedate, in_date: req.body.indate, fine: req.body.fine,booklist: [{isbn:req.body.isbn1, qty: req.body.qty1},{isbn: req.body.isbn2, qty: req.body.qty2}]}).save(function(err){
    if(err){
      res.send(error)
    } else {
      res.redirect('/transactions')
    }
  })
})

router.post('/submitcustomers', function(req,res,next){
  new Model.Customers({name: req.body.name, memberid: req.body.memberid, address: req.body.address, zipcode: req.body.zipcode, phone: req.body.phone}).save(function(err){
    if(err){
      res.send(error)
    } else {
      res.redirect('/customers')
    }
  })
})

router.post('/delete/:id', function(req,res,next){
  Model.Books.remove({isbn: req.params.id}, function(err){
    if (err) {
      res.send(error)
    } else {
      res.redirect('/books')
    }
  })
})

router.post('/edit/:id', function(req,res,next){
  let tempid = req.params.id
  Model.Books.findOne({isbn: req.params.id}, function(err, result){
    res.render('edit.ejs', {book: result.toJSON()})
  })
})

module.exports = router
