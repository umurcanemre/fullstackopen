import CoursePart from "./CoursePart";

const CourseContent = (props) => {
    return (
        <div>
            <CoursePart name={props.parts[0].name} exercises={props.parts[0].exercises} />
            <CoursePart name={props.parts[1].name} exercises={props.parts[1].exercises} />
            <CoursePart name={props.parts[2].name} exercises={props.parts[2].exercises} />
        </div>
    )
}
export default CourseContent