import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

   // Handle input change and update newName state
   const handleNameChange = (event) => {
    setNewName(event.target.value);
   };

   // Handle form submission to add a new person
   const addPerson = (event) => {
    event.preventDefault();

  // Check if the name already exists in the person array
const nameExists = persons.some(person => person.name === newName)

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      setNewName('');
    } else {
      const personObject = {name: newName};
      setPersons(persons.concat(personObject));
      setNewName('');
    }
   }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} >
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App