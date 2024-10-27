const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const Person = require('./phonebook'); // Import the Mongoose model

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Serve static files from the 'build' directory (frontend production build)
app.use(express.static(path.join(__dirname, 'build')));

// Route to retrieve the list of all persons in the phonebook from the database
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(error => next(error));
});

// Route to retrieve general information about the phonebook
app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then(count => {
      const requestTime = new Date();
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${requestTime}</p>
      `);
    })
    .catch(error => next(error));
});

// Route to retrieve a single person by their ID
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: 'Person not found' });
      }
    })
    .catch(error => next(error));
});

// Route to delete a person from the phonebook by their ID
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Person not found' });
      }
    })
    .catch(error => next(error));
});

// Route to add a new person to the phonebook
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  const person = new Person({ name, number });

  person.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(error => next(error));
});

// PUT route to update an existing person's phone number
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  const updatedPerson = { name, number };

  Person.findByIdAndUpdate(
    req.params.id,
    updatedPerson,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).json({ error: 'Person not found' });
      }
    })
    .catch(error => next(error));
});

// Wildcard route to serve index.html for any unmatched routes (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted ID' });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
