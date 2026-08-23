import { useState } from 'react'
const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age
  return (
    <div>
      <p>Hello world {name}, you're {age} years old.</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const Display = ({counter}) => {
  console.log("display updated with ", counter)
  return (
    <div>{counter}</div>
  )
}
const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  )
}
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
    setTotal(left + right + 1)
  }
  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
    setTotal(left + right + 1)
  }
  
return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>total {total}</p>
      <History allClicks={allClicks} />
</div>
  )
}
const App4 = () => {
  const [counter, setCounter] = useState(0)
  console.log('rendering with counter value', counter)
  // setTimeout(
  //   () => setCounter(counter + 1),
  //   1000
  // )
  const incrementClick = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }

  const decreaseByOne = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }
  const zeroClick = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }
  return (
    <div>
      <Display counter={counter} />
      <Button text="plus" onClick={incrementClick} />
      <Button text="minus" onClick={decreaseByOne} />
      <Button text="zero" onClick={zeroClick} />
    </div>
  )
}

const App3 = () => {
  const name = 'Peter'
  const age = '10'
  return (
    <div>
      <h1>Greetings</h1>

      <Hello name='Umur' age={25 + 10} />
      <Hello name='Rumu' age='34' />
      <Hello name='Latte' age='5' />
      <Hello name={name} age={age} />
    </div>
  )
}
const App2 = () => {
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