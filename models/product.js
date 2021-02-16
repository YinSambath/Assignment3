const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
   
  },
  description: {
    type: String
  },
  instockAt: {
    type: Date
    
  },
  quantity: {
    type: Number
    
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  coverImage: {
    type: Buffer
    
  },
  coverImageType: {
    type: String
  },
  category: {
    type: String
  }
})

productSchema.virtual('coverImagePath').get(function() {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
})

module.exports = mongoose.model('Product', productSchema)