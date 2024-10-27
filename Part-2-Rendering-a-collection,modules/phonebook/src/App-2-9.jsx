import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Handle input change and update newName state
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // Handle input change and update newPhone state
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  // Handle search term input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle form submission to add a new person
  const addPerson = (event) => {
    event.preventDefault();

    if (newName.trim() === '' || newPhone.trim() === '') {
      alert("Both name and phone number are required.");
      return;
    }

    const nameExists = persons.some(person => person.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
      setNewName('');
      return;
    }

    const phoneExists = persons.some(person => person.number === newPhone);
    if (phoneExists) {
      alert(`The phone number ${newPhone} is already added to the phonebook`);
      setNewPhone('');
      return;
    }

    const personObject = { name: newName, number: newPhone, id: persons.length + 1 };
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewPhone('');
  };

  // Filter persons based on the search term (case-insensitive)
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Search field */}
      <div>
        Search: <input value={searchTerm} onChange={handleSearchChange} />
      </div>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
