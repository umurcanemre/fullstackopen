const Country = ({country}) => {
    console.log("rendering country ", country)
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital: {country.capital[0]}</div>
            <div>Area: {country.area}</div>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(lang => <li>{lang}</li>)}
            </ul>
            <div><img src={country.flags['svg']} alt={country.flags['alt']} style={{"width":'128px'}} /></div>
        </div>
    )
}

export default Country
