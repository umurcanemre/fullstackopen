const Numbers = ({persons, nameFilter}) => {
    return (
        <>
            <h2>Numbers</h2>
            <div>
                {persons.filter(p => p.name.toLowerCase().includes(nameFilter)).map((person) => <div key={person.name}>{person.name} {person.number}</div>)}
            </div>
        </>
    )
}

export default Numbers