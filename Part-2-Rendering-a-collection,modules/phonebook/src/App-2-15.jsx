import { useState, useEffect } from 'react';
import personService from './personService-2-13';
import Filter from './Filter-2-10';
import PersonForm from './PersonForm-2-10';
import Persons from './Persons-2-14';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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

    // Check if the person already exists based on the name
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      // Ask for confirmation to update the number
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Replace the old number with the new one?`
      );

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newPhone };

        // Update the person’s number in the server
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : returnedPerson
            ));
            setNewName('');
            setNewPhone('');
          })
          .catch(error => {
            console.error('Error updating person:', error);
            alert(`Failed to update ${newName}. They may have already been removed.`);
          });
      }
    } else {
      // Create a new person if they don't already exist
      const personObject = { name: newName, number: newPhone };

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
    }
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error('Error deleting person:', error);
          alert(`Failed to delete ${name}. They may have already been removed.`);
        });
    }
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
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
