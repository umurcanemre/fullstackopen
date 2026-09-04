

const Notification = ({ notification }) => {
    const styles = {
        "error": {
            color: `red`,
            background: `lightgrey`,
            fontSize: `20px`,
            borderStyle: `solid`,
            borderRadius: `5px`,
            padding: `10px`,
            marginBottom: `10px`,
        },
        "success": {
            color: `green`,
            background: `lightgrey`,
            fontSize: `20px`,
            borderStyle: `solid`,
            borderRadius: `5px`,
            padding: `10px`,
            marginBottom: `10px`,
        }
    }

    if (notification === null) {
        return null
    }

    return (
        <div style={styles[notification.type]}>
            {notification.message}
        </div>
    )
}

export default Notification
