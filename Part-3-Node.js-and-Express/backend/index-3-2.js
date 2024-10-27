const express = require('express');
const morgan = require('morgan');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Configure morgan to log requests using the 'tiny' format
app.use(morgan('tiny'));

let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" }
];

// Route to get the list of persons
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

// Route to get information about the phonebook
app.get('/info', (req, res) => {
  const numberOfEntries = persons.length;
  const requestTime = new Date();

  res.send(`
    <p>Phonebook has info for ${numberOfEntries} people</p>
    <p>${requestTime}</p>
  `);
});



// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
