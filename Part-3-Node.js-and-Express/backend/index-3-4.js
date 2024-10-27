const express = require('express')
const app = express()


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

  
app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

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
  const id = Number(req.params.id); // Convert the ID from string to number
  const person = persons.find(person => person.id === id); // Find person by ID

  if (person) {
    res.json(person); // Return person info if found
  } else {
    res.status(404).send({ error: 'Person not found' }); // Respond with 404 if not found
  }
});

// Route to delete a person by ID
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const personExists = persons.some(person => person.id === id);

  if (personExists) {
    persons = persons.filter(person => person.id !== id);
    res.status(204).end(); // 204 No Content means the deletion was successful
  } else {
    res.status(404).send({ error: 'Person not found' });
  }
});
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })