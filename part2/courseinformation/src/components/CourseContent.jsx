import CoursePart from "./CoursePart";

const CourseContent = ( {course} ) => {
    return (
        <div>
            {course.parts.map( p => <CoursePart key={p.id} name={p.name} exercises={p.exercises}/> )}
        </div>
    )
}
export default CourseContent