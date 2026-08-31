import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import FilteredList from './components/FilteredList'
import countryService from './services/countryService'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const debug = false
  console.log("render with state ", countries)

  useEffect(() => {
    console.log("effect")

    countryService.getAll().then(resp => {
      setCountries(resp)
    })
  }, [])

  return (
    <>
      <Filter filter={filter} onChange={(event) => setFilter(event.target.value.toLowerCase())} />
      {debug && filter.length > 0 && <p>The filter value : {filter}</p>}
      <FilteredList countries={countries} filter={filter} />
    </>
  )
}

export default App
