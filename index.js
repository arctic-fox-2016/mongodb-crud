let express = require('express')
let app = express()
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let routes = require('./routes/index.js')

app.set('port', process.env.PORT || 3000)
app.use('/', routes)
//get data inside the database

app.listen(app.get('port'), function(){
  console.log("listening on "+app.get('port'))
})
