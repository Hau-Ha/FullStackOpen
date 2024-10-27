const PersonForm = ({ newName, newPhone, handleNameChange, handlePhoneChange, addPerson }) => (
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
  );
  
  export default PersonForm;
  