require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGODB_URL;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Define schema with validation for name length and phone number format
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3, // Enforces a minimum of 3 characters for the name
  },
  number: {
    type: String,
    required: true,
    minlength: 8, // Enforces a minimum length of 8 characters
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v); // Validates phone number format (e.g., 09-123456 or 040-1234567)
      },
      message: props => `${props.value} is not a valid phone number format! Phone number must be in the form XX-XXXXXXX or XXX-XXXXXXXX`,
    },
  },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
