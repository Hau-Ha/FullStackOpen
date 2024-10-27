import Header from './Header-2-1';
import Content from './Content-2-1';

const Course = ({ course }) => {
  // Calculate the total number of exercises
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <p><strong>Total of {totalExercises} exercises</strong></p>
    </div>
  );
};

export default Course;
