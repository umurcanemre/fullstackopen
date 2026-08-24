
import CourseContent from "./CourseContent";
import Header from "./Header";
import Total from "./Total";

const Course = ( {course} ) => {
    return (
        <>
        <Header text={course.name} />
        <CourseContent course={course} />
        <Total course={course} />
        </>
    )
}
export default Course