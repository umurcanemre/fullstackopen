import Country from "./Country"

const FilteredList = ({ countries, filter }) => {
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
            {selectedCountries.map(c => <div key={c.name.common}>{c.name.common}</div>)}
        </div>
    )
}

export default FilteredList