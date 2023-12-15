const Courses = ({ courses }) => {
  const updatedCourses = courses.map((course) => ({
    ...course,
    totalExercises: course.parts.reduce(
      (sum, part) => (sum += part.exercises),
      0
    ),
  }));

  // For my solution to exercises 2.1-2.5 I copied the original courses object with its
  // properties and values and added a new property called totalExercises whose value is calculated using
  // the reduce method on the parts array within each course (Fun Fun Function Youtube channel was very
  // helpful in this regard).

  return (
    <div>
      <h1>Web development curriculum</h1>
      {updatedCourses.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>

          {course.parts.map((x) => (
            <p key={x.id}>
              {x.name} {x.exercises}
            </p>
          ))}

          <p>Total of {course.totalExercises} exercises </p>
        </div>
      ))}
    </div>
  );
};

export default Courses;
