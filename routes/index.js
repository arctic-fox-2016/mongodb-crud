var express = require('express');
var router = express.Router();
var Book = require('../model/books')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list', function(req, res, next) {
  Book.find(function(err,result){
    res.render('list',{result:result});
  })
});

router.post('/delete/:id', function(req, res, next) {
  var bookId = req.params.id;
  console.log(bookId);
  Book.findOneAndRemove({_id:bookId},function(err,result){
    res.redirect('/list');
  })
});

router.post('/list', function(req, res, next) {
  var status
  var isbn = req.body.isbn
  var title = req.body.title
  var author = req.body.author
  var category = req.body.category
  var stock = req.body.stock
  var newBook = Book({
    isbn:isbn,
    title:title,
    author:author,
    category:category,
    stock:stock
  })
  newBook.save(function(err){
    if(err)throw err;
    status="new Book is created"
    console.log("new Book is created");
    Book.find(function(err,result){
      //console.log(`${isbn}-${title}-${author}-${category}-${stock}`);
      res.render('list',{result:result});
    })
  })
});

router.post('/save', function(req, res, next) {
    var status
    var id = req.body.id
    var isbn = req.body.isbn
    var title = req.body.title
    var author = req.body.author
    var category = req.body.category
    var stock = req.body.stock
    Book.findOneAndUpdate({_id:id},{
      $set:{"id":id
            , "isbn":isbn
            , "title":title
            , "author":author
            , "category":category
            , "stock":stock
          }
    },function(err,result){
      res.redirect('list');
    })
})

router.post('/edit/:id', function(req, res, next) {
  var bookId = req.params.id;
  Book.findOne({_id:bookId},function(err,result){
    res.render('edit', { result: result });
  })
});





module.exports = router;
