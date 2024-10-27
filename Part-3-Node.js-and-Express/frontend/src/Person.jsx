const Person = ({ person, deletePerson }) => (
  <li>
    {person.name} {person.number}
    <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
  </li>
);

export default Person;
