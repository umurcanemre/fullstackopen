import { useParams, useNavigate } from 'react-router-dom'

const Note = ({ notes, toggleImportance, removeNote }) => {
  const navigate = useNavigate()
  console.log('params', useParams())
  const id = useParams().id
  console.log('id', id)
  const note = notes.find(n => n.id === id)
  console.log('selected note', note)

  if (!note) {
    return (
      <>404</>
    )
  }

  const label = note.important ? 'non-important' : 'important'
  return <div className='note'>
    <span>{note.content}</span>
    <button onClick={() => toggleImportance(note)}>{label}</button>
    <button onClick={() => {
      removeNote(note)
      navigate('/notes')
    }}>delete</button>
  </div>
}

export default Note