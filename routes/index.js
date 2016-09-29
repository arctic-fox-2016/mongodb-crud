let express = require('express')
let mongoose = require('mongoose')
let router = express('router')
let bodyParser = require('body-parser')
let Model = require('../models/model.js')
let convertDate = require('../helper/function.js')

router.use(bodyParser.urlencoded({extended:true}))
router.set('view-engine','ejs')

router.get('/', function(req,res,next){
  mongoose.model('transactions').find(function(err, result){
    let transactions = result
    mongoose.model('books').find(function(err, result){
      let books = result
      mongoose.model('customers').find(function(err, result){
        let customers = result
        res.render('result.ejs', {books: books, transactions: transactions, customers: customers})
      })
    })
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
      res.redirect('/')
    }
  })
})

router.post('/submittransactions', function(req,res,next){
  new Model.Transactions({memberid: req.body.memberid, days: req.body.days, out_date: req.body.outdate, due_date: req.body.duedate, in_date: req.body.indate, fine: req.body.fine,booklist: [{isbn:req.body.isbn1, qty: req.body.qty1},{isbn: req.body.isbn2, qty: req.body.qty2}]}).save(function(err){
    if(err){
      res.send(error)
    } else {
      res.redirect('/')
    }
  })
})

router.post('/submitcustomers', function(req,res,next){
  new Model.Customers({name: req.body.name, memberid: req.body.memberid, address: req.body.address, zipcode: req.body.zipcode, phone: req.body.phone}).save(function(err){
    if(err){
      res.send(error)
    } else {
      res.redirect('/')
    }
  })
})

router.post('/deletebooks/:id', function(req,res,next){
  Model.Books.remove({isbn: req.params.id}, function(err){
    if (err) {
      res.send(error)
    } else {
      res.redirect('/')
    }
  })
})

router.post('/editbooks/:id', function(req,res,next){
  Model.Books.findOne({isbn: req.params.id}, function(err, result){
    res.render('edit.ejs', {book: result.toJSON()})
  })
})

router.post('/updatedbooks/:id', function(req,res,next){
  Model.Books.update({_id: req.params.id}, {isbn: req.body.isbn, title: req.body.title, author: req.body.author, category: req.body.category, stock: req.body.stock}, function(err, result){
    res.redirect('/')
  })
})

router.post('/deletecustomers/:id', function(req,res,next){
  Model.Customers.remove({memberid: req.params.id}, function(err){
    if (err) {
      res.send(error)
    } else {
      res.redirect('/')
    }
  })
})

router.post('/editcustomers/:id', function(req,res,next){
  Model.Customers.findOne({memberid: req.params.id}, function(err, result){
    res.render('editcustomers.ejs', {customers: result.toJSON()})
  })
})

router.post('/updatedcustomers/:id', function(req,res,next){
  Model.Customers.update({_id: req.params.id}, {name: req.body.name, memberid: req.body.memberid, zipcode: req.body.zipcode, address: req.body.address, phone: req.body.phone}, function(err, result){
    res.redirect('/')
  })
})

router.post('/deletetransactions/:id', function(req,res,next){
  Model.Transactions.remove({_id: req.params.id}, function(err){
    if (err) {
      res.send(error)
    } else {
      res.redirect('/')
    }
  })
})

router.post('/edittransactions/:id', function(req,res,next){
  Model.Transactions.findOne({_id: req.params.id}, function(err, result){
    res.render('edittransactions.ejs', {transaction: result.toJSON(), convertDate: convertDate})
  })
})

router.post('/updatedtransactions/:id', function(req,res,next){
  Model.Transactions.update({_id: req.params.id}, {memberid: req.body.memberid, days: req.body.days, out_date: req.body.outdate, due_date: req.body.duedate, in_date: req.body.indate, fine: req.body.fine,
    // for(let i in req.body.booklistisbn){
    //   booklist[i].isbn: req.body.booklistisbn[i], booklist[i].qty: req.body.booklistqty[i]
    // }
  },
    function(err, result){
    res.redirect('/')
  })
})

module.exports = router
