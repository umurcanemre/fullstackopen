import { Alert } from '@mui/material'

const Notification = ({ message, type = 'error' }) => {
  console.log('notification message', message)
  if (!message) {
    return null
  }

  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={type}>
      {message}
    </Alert>
  )
}

export default Notification