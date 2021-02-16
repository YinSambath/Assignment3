const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const User = require('../models/users')
const shopController = require('../controllers/shopController')
/*  router.get('/', async (req, res) => {
  let products
  try {
    products = await Product.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch {
    products = []
  }
  res.render('index', { products: products })
}) 
 */
router.get('/', (req, res)=>{
  res.render('home',{ layout: 'home' })
})
router.get('/page2', (req, res)=>{
  res.render('Ecommerce-page2',{ layout: 'Ecommerce-page2' })
})




router.get('/signin', shopController.signIn);
router.get('/signup', shopController.signUp);
router.post('/register', shopController.register)


module.exports = router