import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , phone: '134'
   }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

   // Handle input change and update newName state
   const handleNameChange = (event) => {
    setNewName(event.target.value);
   };

    // Handle input change and update newPhone state
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
   };



  // Handle form submission to add a new person
  const addPerson = (event) => {
    event.preventDefault();

    // Check if either name or phone field is empty
    if (newName.trim() === '' || newPhone.trim() === '') {
      alert("Both name and phone number are required.");
      return;
    }

    // Check if the name already exists
    const nameExists = persons.some(person => person.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
      setNewName('');
      return;
    }

    // Check if the phone number already exists
    const phoneExists = persons.some(person => person.phone === newPhone);
    if (phoneExists) {
      alert(`The phone number ${newPhone} is already added to the phonebook`);
      setNewPhone('');
      return;
    }

    // If both are unique and non-empty, add the new person
    const personObject = { name: newName, phone: newPhone };
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewPhone('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} >
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newPhone} onChange={handlePhoneChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>
            {person.name} {person.phone}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App