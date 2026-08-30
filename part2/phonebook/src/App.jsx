import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import service from './services/service'

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameFilter, setNameFilter] = useState('')
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    console.log('effect run')
    service.getPeople()
      .then(people => {
        setPersons(people)
      })
  }, [refresh])

  const addPerson = (newName, newPhone) => {
    const person = persons.find(p => p.name === newName)
    if (person !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook. Do you want to change the phone number?`)) {
        const updatedPerson = { ...person, number: newPhone }
        console.log(`updating person with ${person.id} to`, updatedPerson )
        service.updatePerson(updatedPerson).then(() => {
          console.log("phone overwritten")
          setRefresh(!refresh)
        }
        )
      }
      else {
        console.log("name exists but phone not overwritten")
      }
    }
    else {
      const personRecord = {
        id: String(persons.length + 1),
        name: newName,
        number: newPhone
      }
      console.log("adding ", newName, newPhone)
      service.addPerson(personRecord).then(() => setRefresh(!refresh))
    }
  }

  const filterName = (event) => {
    setNameFilter(event.target.value.toLowerCase())
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      service.deletePerson(person)
        .then(() => setRefresh(!refresh))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} filterByName={filterName} />
      <PersonForm addPerson={addPerson} />
      <Numbers persons={persons} nameFilter={nameFilter} onDelete={deletePerson} />
    </div>
  )
}

export default App