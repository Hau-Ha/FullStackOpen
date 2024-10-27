import Person from './Person-2-10';

const Persons = ({ persons }) => (
  <ul>
    {persons.map(person => (
      <Person key={person.id} person={person} />
    ))}
  </ul>
);

export default Persons;
