import CoursePart from "./CoursePart";

const CourseContent = (props) => {
    return (
        <div>
            <CoursePart name={props.parts[0]} exercises={props.exercises[0]} />
            <CoursePart name={props.parts[1]} exercises={props.exercises[1]} />
            <CoursePart name={props.parts[2]} exercises={props.exercises[2]} />
        </div>
    )
}
export default CourseContent