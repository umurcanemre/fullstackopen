const Total = ({ course }) => {
    const totalExercises = course.parts.map(p => p.exercises).reduce((a, b) => a + b, 0)
    return (
        <div><strong>total of {totalExercises} exercises</strong></div>
    )
}
export default Total