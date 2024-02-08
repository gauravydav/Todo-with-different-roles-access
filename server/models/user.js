const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Manager', 'Employee', 'Guest'], default: 'Guest' },
});

module.exports = mongoose.model('User', userSchema);
