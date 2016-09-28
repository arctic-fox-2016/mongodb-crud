var express = require('express');
var router = express.Router();
var book = require('../models/book')

/* GET home page. */
router.get('/', function (req, res, next) {
	book.find(function (err, result) {
		res.render('index', {
			title: 'Welcome to Our Library',
			daftarbuku: result
		});
	})
});

router.post('/addbook', function (req, res, next) {
	var newBook = book({
		"isbn": req.body.isbn,
		"title": req.body.title,
		"author": req.body.author,
		"category": req.body.category,
		"stock": req.body.stock
	})
	newBook.save(function (err) {
		if (err) throw err;
		console.log('User created!');
	})

	res.redirect('/')
})

router.post('/delete/:id', function (req, res, next) {
	console.log(req.params.id);
	book.findOneAndRemove({
		_id: req.params.id
	}, function (err, result) {
		res.redirect('/')
	})
})

router.post('/edit/:id', function (req, res, next) {
	console.log(req.params.id);
	book.findOne({
		_id: req.params.id
	}, function (err, result) {
		res.render('edit', {
			title: 'Edit Book Detail',
			result: result
		})
	})
})

router.post('/editsave', function (req, res, next) {
	book.findOneAndUpdate({
		_id: req.body.id
	}, {
		$set: {
			"isbn": req.body.isbn,
			"title": req.body.title,
			"author": req.body.author,
			"category": req.body.category,
			"stock": req.body.stock
		}
	}, function (err, result) {
		res.redirect('/')
	})
})


module.exports = router;
