import { useState } from 'react'

const Togglable = (props) => {
  const [toggle, setToggle] = useState(false)
  const visibleComp = { display: toggle ? '' : 'none' }
  const invisibleComp = { display: toggle ? 'none' : '' }

  const toggleFlip = () => setToggle(!toggle)

  console.log('toggleable props ', props)
  return (
    <>
      <div style={visibleComp}>
        {props.children}
        <button onClick={toggleFlip}>cancel</button>
      </div>
      <div style={invisibleComp}>
        <button onClick={toggleFlip}>{props.label}</button>
      </div>
    </>
  )
}

export default Togglable