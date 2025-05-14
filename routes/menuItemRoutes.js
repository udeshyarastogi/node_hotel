const express= require ('express');
const router=express.Router();
const MenuItem = require('./../models/Menuitem');
// POST route for menu item
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newItem = new MenuItem(data);
    const response = await newItem.save();
    console.log('Menu item saved:', response);
    res.status(201).json(response);
  } catch (err) {
    console.error('Error saving menu item:', err.message);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});
//GET route to fetch all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    console.log('Menu items fetched');
    res.status(200).json(items);
  } catch (err) {
    console.error('Error fetching menu items:', err.message);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});
//comment added
module.exports=router;