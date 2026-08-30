import { useState } from "react"

function phoneValid(no) {
    if (no.charAt(0) === '+') {
        return no.substring(1, no.length).split('').filter(c => c !== '-').every(char => char >= '0' && char <= '9')
    }
    else {
        return no.split('').filter(c => c !== '-').every(char => char >= '0' && char <= '9')
    }
}

const PersonForm = ({ addPerson }) => {
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const controlName = (event) => {
        // console.log("entered ", event.target.value)
        setNewName(event.target.value)
    }
    const controlPhone = (event) => {
        const validity = phoneValid(event.target.value) ? 'valid' : 'invalid'
        // console.log(`entered ${validity} phone `, event.target.value)
        setNewPhone(event.target.value)
    }
    const onSubmit = (event) => {
        event.preventDefault()
        if (!phoneValid(newPhone)) {
            alert(`${newPhone} is invalid`)
        }
        addPerson(newName, newPhone)
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
                    number: <input value={newPhone} onChange={controlPhone} />
                </div>
                <div>
                    <button type="submit" onClick={onSubmit}>add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm