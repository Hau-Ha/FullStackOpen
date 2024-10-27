import { useState } from 'react';
import Filter from './Filter-2-10';
import PersonForm from './PersonForm-2-10';
import Persons from './Persons-2-10';

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

  const handleNameChange = (event) => setNewName(event.target.value);
  const handlePhoneChange = (event) => setNewPhone(event.target.value);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

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

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}
      />
      
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
