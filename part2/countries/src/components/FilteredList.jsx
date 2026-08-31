import Country from "./Country"

const FilteredList = ({ countries, filter }) => {
    // const selectedCountries = Array.from(countries.keys()).sort().filter(c => c.toLowerCase().includes(filter.toLowerCase()))
    const selectedCountries = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
    console.log("Showing filtered list of ", selectedCountries)

    if (selectedCountries.length === 1) {
        return (
            <Country country={selectedCountries[0]} />
        )
    }
    if (selectedCountries.length >= 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    return (
        <div>
            {selectedCountries.map(c => <div>{c.name.common}</div>)}
        </div>
    )
}

export default FilteredList