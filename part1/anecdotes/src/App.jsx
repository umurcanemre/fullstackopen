import { useState } from 'react'

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Array(anecdotes.length).fill(0))

  const setRandomAnectode = () => {
    const anectodeIndex = Math.floor(Math.random() * anecdotes.length)
    console.log("selected anectode index = " + anectodeIndex)
    setSelected(anectodeIndex)
  }
  const voteAnectode = () => {
    console.log("voted for anectode on index = " + selected)
    console.log("votes : ", votes)
    const updatedVotes = [].concat(votes.slice(0, selected)).concat([votes[selected] + 1]).concat(votes.slice(selected + 1, votes.length))
    console.log("update votes : ", updatedVotes)
    setVote(updatedVotes)
  }

  if (votes.reduce((a, b) => a + b, 0) > 0) {

    const highestVotedAnectodeIndex = votes.indexOf(Math.max(...votes))
    return (<>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
        <br />
        <div>has {votes[selected]} votes</div>
        <button onClick={voteAnectode}>Vote</button>
        <button onClick={setRandomAnectode}>Another</button>
      </div>

      <h1>Anecdote with the most votes</h1>
      <div>
        {anecdotes[highestVotedAnectodeIndex]}
        <br />
        <div>has {votes[highestVotedAnectodeIndex]} votes</div>
      </div>
    </>
    )
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
        <br />
        <div>has {votes[selected]} votes</div>
        <button onClick={voteAnectode}>Vote</button>
        <button onClick={setRandomAnectode}>Another</button>
      </div>
    </>
  )
}

export default App
