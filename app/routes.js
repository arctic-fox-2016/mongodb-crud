//create new express router
const express = require('express'),
  router = express.Router()
  mainController = require('./controllers/main.controller')
  dataController = require('./controllers/data.controller')

//export router
module.exports = router

//define routes

//main routes
router.get('/', mainController.showHome)

//show library
router.get('/library', dataController.showLibrary)

//create book
router.get('/library/books/add', dataController.showAddBook)
router.post('/library/books/add', dataController.processAddBook)

//edit book
router.get('/library/books/:id/edit', dataController.showEditBook)
router.post('/library/books/:id', dataController.processEditBook)

//delete book
router.get('/library/books/:id/delete', dataController.deleteBook)

//show single book
router.get('/library/books/:id', dataController.showBook)

//======================================================================

//create customer
router.get('/library/customers/add', dataController.showAddCustomer)
router.post('/library/customers/add', dataController.processAddCustomer)

//edit customer
router.get('/library/customers/:id/edit', dataController.showEditCustomer)
router.post('/library/customers/:id', dataController.processEditCustomer)

//delete customer
router.get('/library/customers/:id/delete', dataController.deleteCustomer)

//show single customer
router.get('/library/customers/:id', dataController.showCustomer)



