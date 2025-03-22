const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

// GET all contacts, sorted by createdAt (newest first)
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// POST a new contact
router.post('/', auth, async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  try {
    const newContact = await contact.save();
    res.status(201).json({ message: 'Contact saved successfully', contact: newContact });
  } catch (err) {
    console.error('Error saving contact:', err.message);
    res.status(400).json({ message: err.message });
  }
});

// DELETE a contact by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log('Invalid ObjectId:', req.params.id);
      return res.status(400).json({ message: 'Invalid contact ID' });
    }

    console.log('Deleting contact with ID:', req.params.id);
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      console.log('Contact not found for ID:', req.params.id);
      return res.status(404).json({ message: 'Contact not found' });
    }
    await contact.deleteOne(); // Ensure this is deleteOne(), not remove()
    console.log('Contact deleted successfully:', req.params.id);
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    console.error('Error deleting contact:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;