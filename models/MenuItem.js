const mongoose = require('mongoose'); // Importing mongoose

// Creating a schema named menuItemSchema
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,            
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,            
    enum: ['sweet', 'spicy', 'sour'],
    required: true,
  },
  is_drink: {
    type: Boolean,           
    default: false,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  }
});

// ✅ Exporting the model correctly (was `module.export`)
const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
