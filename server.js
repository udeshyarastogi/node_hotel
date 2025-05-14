const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const Person = require('./models/person'); // 👈 make sure 'person' matches actual file name
const MenuItem = require('./models/Menuitem');
const app = express(); // ✅ define app BEFORE using it

app.use(bodyParser.json()); // ✅ middleware after app is declared

app.get('/', (req, res) => {
  res.send('Welcome to my hotel');
});
//post ethod to add person item
app.post('/person', async (req, res) => {
  try {
    console.log("Incoming data:", req.body); // log input

    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();

    console.log('Data saved:', response);
    res.status(201).json(response);
  } catch (err) {
    console.error('Error saving person:', err.message);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// GET method to get all persons
app.get('/person', async (req, res) => {
  try {
    const data = await Person.find(); // fetch all persons
    console.log('Data fetched');
    res.status(200).json(data); 
  } catch (err) {
    console.error('Error fetching person:', err.message); 
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});
// POST route for menu item
app.post('/menu', async (req, res) => {
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
app.get('/menu', async (req, res) => {
  try {
    const items = await MenuItem.find();
    console.log('Menu items fetched');
    res.status(200).json(items);
  } catch (err) {
    console.error('Error fetching menu items:', err.message);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
