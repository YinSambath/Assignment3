  const express = require('express')
  const app = express()
  const expressLayouts = require('express-ejs-layouts')
  const bodyParser = require('body-parser')
  const methodOverride = require('method-override')
  
  const indexRouter = require('./routes/index')
  const productRouter = require('./routes/products')

  app.set('view engine', 'ejs')
  app.set('views', __dirname + '/views')
  app.set('layout', 'layouts/layout')
  app.set("layout home", false);
  app.set("layout signin", false);
  app.set("layout signup", false);

  
  app.use(expressLayouts)
  app.use(methodOverride('_method'))
  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
  
  const mongoose = require('mongoose')
  //mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  mongoose.connect('mongodb+srv://user1:010700923@cluster0.xdvle.mongodb.net/uploadfile?retryWrites=true&w=majority',{ useNewUrlParser: true })
  const db = mongoose.connection
  db.on('error', error => console.error(error))
  db.once('open', () => console.log('Connected to Mongoose'))
  
  app.use('/', indexRouter)
  app.use('/products', productRouter)
  
  app.listen(3000)