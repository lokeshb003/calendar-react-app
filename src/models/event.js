// models/event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  id: String,
  date: String,
  title: String,
});

module.exports = mongoose.model('Event', eventSchema);
