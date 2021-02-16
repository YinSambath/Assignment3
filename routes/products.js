const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

// All Books Route
router.get('/', async (req, res) => {
  let query = Product.find()
  if (req.query.name != null && req.query.name != '') {
    query = query.regex('name', new RegExp(req.query.name, 'i'))
  }
  try {
    const products = await query.exec()
    res.render('products/index', {
      products: products,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Book Route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Product())
})

// Create Book Route
router.post('/', async (req, res) => {
  const products = new Products({
    name: req.body.name,
    instockAt: new Date(req.body.instockAt),
    quantity: req.body.quantity,
    description: req.body.description
  })
  saveCover(products, req.body.cover)

  try {
    const newProduct = await products.save()
    res.redirect(`products/${newProduct.id}`)
  } catch {
    renderNewPage(res, product, true)
  }
})

// Show Book Route
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
                                 .exec()
    res.render('products/show', { product: product })
  } catch {
    res.redirect('/')
  }
})

// Edit Book Route
router.get('/:id/edit', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    renderEditPage(res, product)
  } catch {
    res.redirect('/')
  }
})

// Update Book Route
router.put('/:id', async (req, res) => {
  let product

  try {
    product = await Product.findById(req.params.id)
    product.name = req.body.name
    product.instockAt = new Date(req.body.instockAt)
    product.quantity = req.body.quantity
    product.description = req.body.description
    if (req.body.cover != null && req.body.cover !== '') {
      saveCover(product, req.body.cover)
    }
    await product.save()
    res.redirect(`/products/${product.id}`)
  } catch {
    if (product != null) {
      renderEditPage(res, product, true)
    } else {
      redirect('/')
    }
  }
})

// Delete Book Page
router.delete('/:id', async (req, res) => {
  let product
  try {
    product = await Product.findById(req.params.id)
    await product.remove()
    res.redirect('/products')
  } catch {
    if (product != null) {
      res.render('products/show', {
        product: product,
        errorMessage: 'Could not remove product'
      })
    } else {
      res.redirect('/')
    }
  }
})

async function renderNewPage(res, product, hasError = false) {
  renderFormPage(res, product, 'new', hasError)
}

async function renderEditPage(res, product, hasError = false) {
  renderFormPage(res, product, 'edit', hasError)
}

async function renderFormPage(res, product, form, hasError = false) {
  try {
    const params = {
      product: product
    }
    if (hasError) {
      if (form === 'edit') {
        params.errorMessage = 'Error Updating Product'
      } else {
        params.errorMessage = 'Error Creating Product'
      }
    }
    res.render(`products/${form}`, params)
  } catch {
    res.redirect('/products')
  }
}

function saveCover(product, coverEncoded) {
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    product.coverImage = new Buffer.from(cover.data, 'base64')
    product.coverImageType = cover.type
  }
}

module.exports = router