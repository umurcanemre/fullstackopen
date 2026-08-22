const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello world {props.name}, you're {props.age} years old.</p>
    </div>
  )
}

const App2 = () => {
  const name='Peter'
  const age='10'
  return (
    <div>
      <h1>Greetings</h1>

      <Hello name='Umur' age ={25+10}/>
      <Hello name='Rumu' age='34' />
      <Hello name='Latte' age='5'/>
      <Hello name={name} age={age} />
    </div>
  )
}
const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return ( // Objects are not valid as a React child, works with friends[0].name 
    <div>
      <p>{friends[0]}</p>
      <p>{friends[1]}</p>
    </div>
  )
}


export default App