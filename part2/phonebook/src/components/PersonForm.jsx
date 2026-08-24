const PersonForm = ({ addPerson, newName, controlName, newPhone, controlPhone }) => {

    return (
        <>
            <h2>Add new entry</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={controlName} />
                </div>
                <div>
                    number: <input value={newPhone} onChange={controlPhone} />
                </div>
                <div>
                    <button type="submit" onClick={addPerson}>add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm