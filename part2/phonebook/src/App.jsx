import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '1205835' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  function phoneValid(no) {
    if (no.charAt(0) === '+') {
      return no.substring(1, no.length).split('').filter(c => c !== '-').every(char => char >= '0' && char <= '9')
    }
    else {
      return no.split('').filter(c => c !== '-').every(char => char >= '0' && char <= '9')
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already on the phonebook`)
    }
    if (!phoneValid(newPhone)) {
      alert(`${newPhone} is invalid`)
    }
    else {
      console.log("adding ", newName, newPhone)
      setPersons(persons.concat({ name: newName, number: newPhone }))
      setNewName('')
      setNewPhone('')
    }
  }

  const controlName = (event) => {
    console.log("entered ", event.target.value)
    setNewName(event.target.value)
  }
  const controlPhone = (event) => {
    const validity = phoneValid(event.target.value) ? 'valid' : 'invalid'
    console.log(`entered ${validity} phone `, event.target.value)
    setNewPhone(event.target.value)
  }
  const filterName = (event) => {
    setNameFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} filterByName={filterName} />
      <PersonForm addPerson={addPerson} newName={newName} controlName={controlName} newPhone={newPhone} controlPhone={controlPhone} />
      <Numbers persons={persons} nameFilter={nameFilter} />
    </div>
  )
}

export default App