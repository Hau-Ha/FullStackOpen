const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

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

// Route to get a single person by ID
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).send({ error: 'Person not found' });
  }
});

// Route to delete a person by ID
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const personExists = persons.some(person => person.id === id);

  if (personExists) {
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
  } else {
    res.status(404).send({ error: 'Person not found' });
  }
});

// Route to add a new person
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  // Error if name or number is missing
  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  // Error if name already exists
  const nameExists = persons.some(person => person.name === name);
  if (nameExists) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  // Generate a new unique ID
  const id = Math.floor(Math.random() * 1000000);

  // Create a new person entry
  const newPerson = { id, name, number };
  persons = persons.concat(newPerson);

  // Respond with the new entry
  res.json(newPerson);
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

