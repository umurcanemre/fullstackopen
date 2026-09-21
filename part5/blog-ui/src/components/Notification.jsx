const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div label='notification' className={type}>
      {message}
    </div>
  )
}

export default Notification