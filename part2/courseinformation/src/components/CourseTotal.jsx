const CourseTotal = (props) =>
    <p>
        Number of exercies {props.parts.map(p => p.exercises).reduce((a, b) => a + b, 0)}
    </p>
export default CourseTotal