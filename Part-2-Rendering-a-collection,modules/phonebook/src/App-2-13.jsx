import { useState, useEffect } from 'react';
import personService from './personService-2-13';
import Filter from './Filter-2-10';
import PersonForm from './PersonForm-2-10';
import Persons from './Persons-2-10';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from the server using personService
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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

    const personObject = { name: newName, number: newPhone };

    // Use personService to add the new person to the server
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewPhone('');
      })
      .catch(error => {
        console.error('Error adding new person:', error);
        alert('Failed to add new contact. Please try again later.');
      });
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