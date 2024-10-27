require('dotenv').config();
const mongoose = require('mongoose');

// Get name and number from command-line arguments
const name = process.argv[2];
const number = process.argv[3];
const password = process.env.MONGODB_PASSWORD; // Retrieve password from environment variable

// Replace 'cluster0' with your actual cluster name if it's different
const url = `mongodb+srv://haduyhau:${password}@cluster0.jkyw6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Define schema and model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 2) {
  // Display list if no name or number is provided
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 4) {
  // Add entry to the phonebook if both name and number are provided
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log('Please provide the name and number as arguments: node mongo.js <name> <number>');
  mongoose.connection.close();
}
