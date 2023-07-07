// server.js
const express = require('express');
const mongoose = require('mongoose');
const Event = require('./models/event');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://lokeshbalajidev:kepler22b@cluster0.fg0hak3.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/events/:date', async (req, res) => {
  try {
    const date = req.params.date;
    const events = await Event.find({ date });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/events/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Event.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});

export default Server;