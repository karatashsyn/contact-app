const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A contact must have a name.'],
    trim: true,
    maxlength: [20, 'You exceeded the character limit for the name.'],
  },
  number: {
    type: String,
    trim: true,
    required: [true, 'A contact must have a name.'],
    maxlength: [15, 'You exceeded the charact`er limit for the number.'],
  },
});

const Contact = mongoose.model('Contact', contactSchema);
//As a convenction, use upper case for model names and variables.
module.exports = Contact;
