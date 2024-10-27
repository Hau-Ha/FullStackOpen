import Person from './Person-2-14';

const Persons = ({ persons, deletePerson }) => (
  <ul>
    {persons.map(person => (
      <Person key={person.id} person={person} deletePerson={deletePerson} />
    ))}
  </ul>
);

export default Persons;
