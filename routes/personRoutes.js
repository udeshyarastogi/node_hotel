const express = require('express');
const router = express.Router();
const Person = require('../models/person');

// POST method to add person
router.post('/', async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const saved = await newPerson.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// GET all persons
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// GET by work
router.get('/:work', async (req, res) => {
  const workType = req.params.work.toLowerCase();
  const validWorks = ['chef', 'waiter', 'manager'];

  if (!validWorks.includes(workType)) {
    return res.status(400).json({ error: 'Invalid work type' });
  }

  try {
    const data = await Person.find({ work: workType });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// ✅ PUT to update person by ID
router.put('/:id', async (req, res) => {
  try {
    const personId= req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
})
router.delete('/:id',async(req,res)=>{
    try{
        const personId= req.params.id;
        const response = await Person.findByIdAndRemove(personId);
        if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }
    console.log('data deleted');
    res.status(200).json({message:'person deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
})

module.exports = router;
