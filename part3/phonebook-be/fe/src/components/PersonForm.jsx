import { useState } from "react"

const PersonForm = ({ addPerson }) => {
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const controlName = (event) => {
        // console.log("entered ", event.target.value)
        setNewName(String(event.target.value))
    }
    const changePhone = (event) => {
        setNewPhone(String(event.target.value))
    }
    const onSubmit = (event) => {
        event.preventDefault()
        addPerson(newName.trim(), newPhone.trim())
        setNewName('')
        setNewPhone('')
    }
    return (
        <>
            <h2>Add new entry</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={controlName} />
                </div>
                <div>
                    number: <input value={newPhone} onChange={changePhone} />
                </div>
                <div>
                    <button type="submit" onClick={onSubmit}>add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm