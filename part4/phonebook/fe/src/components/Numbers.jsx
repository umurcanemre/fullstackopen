const Numbers = ({ persons, nameFilter, onDelete }) => {
    return (
        <>
            <h2>Numbers</h2>
            <div>
                {persons.filter(p => p.name.toLowerCase().includes(nameFilter)).map((person) =>
                    <div key={person.id}>{person.name} {person.number} <button key={person.id} onClick={() => onDelete(person)}>Delete</button></div>
                )}
            </div>
        </>
    )
}

export default Numbers