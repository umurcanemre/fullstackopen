import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {    
    console.log('effect')
    axios.get('http://localhost:3001/persons')
    .then(resp=> {
      setPersons(resp.data)
    })
  }, [])

  const addPerson = (newName, newPhone) => {
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already on the phonebook`)
    }
    else {
      console.log("adding ", newName, newPhone)
      setPersons(persons.concat({ name: newName, number: newPhone }))
    }
  }

  const filterName = (event) => {
    setNameFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} filterByName={filterName} />
      <PersonForm addPerson={addPerson} />
      <Numbers persons={persons} nameFilter={nameFilter} />
    </div>
  )
}

export default App