import Header from "./Header"
import CourseContent from "./CourseContent"
import CourseTotal from "./CourseTotal"

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header text={course.name} />
      <CourseContent parts={course.parts} />
      <CourseTotal parts={course.parts} />
    </div >
  )
}

export default App