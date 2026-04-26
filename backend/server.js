const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Idea = require('./models/Idea');
const Contact = require('./models/Contact');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ENV
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Safety check
if (!MONGO_URI) {
  console.error("❌ MONGO_URI missing in environment variables");
  process.exit(1);
}

// Routes
app.get('/', (req, res) => {
  res.send("API is running 🚀");
});

// 1. GET ideas
app.get('/api/ideas', async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });
    res.status(200).json(ideas);
  } catch (error) {
    console.error('Error fetching ideas:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// 2. POST idea
app.post('/api/ideas', async (req, res) => {
  try {
    const { title, details, rolesNeeded, stage, keywords, authorName, contactLinks } = req.body;

    if (!title || !details || !rolesNeeded || !stage) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newIdea = new Idea({
      title,
      details,
      rolesNeeded,
      stage,
      keywords,
      authorName: authorName || 'Anonymous',
      contactLinks
    });

    const savedIdea = await newIdea.save();
    res.status(201).json(savedIdea);

  } catch (error) {
    console.error('Error creating idea:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// 3. POST contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newContact = new Contact({ name, email, subject, message });
    const savedContact = await newContact.save();

    res.status(201).json(savedContact);

  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// 🔥 CONNECT DB FIRST, THEN START SERVER
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected ✅');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch(err => {
    console.error('MongoDB connection failed ❌', err);
  });
