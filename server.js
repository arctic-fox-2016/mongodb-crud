//load environment variables
require('dotenv').config()

//grab dependencies
var express       = require('express'),
  app             = express(),
  port            = process.env.PORT || 8080,
  expressLayouts  = require('express-ejs-layouts'),
  mongoose        = require('mongoose'),
  bodyParser      = require('body-parser')

//configure application

//tell express where to look for static assets
app.use(express.static(__dirname + '/public')) // look for css
app.use(expressLayouts) //will by default look in views/layout.ejs

//connect to MongoDB
mongoose.connect(process.env.DB_URI)

// use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }));

//set ejs as templating engine
app.set('view engine', 'ejs')

//set routes
app.use(require('./app/routes'))

//start server
app.listen(port, () => {
  console.log(`App is starting on ${port}`)
})
