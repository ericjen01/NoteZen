const Notification = ({ messageObj }) => {
  const messageStyle = {
      background: 'lightgrey',
      fontWeight: 'bold',
      fontsize: '5rem',
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      color: messageObj ? (messageObj.type === 'error' ? 'red' : 'green') : null,
  }

  return (
      messageObj
          ? (
              <div
                  className={messageObj.type === 'error' ? 'error' : 'success'}
                  style={messageStyle}
              >
                  {messageObj.message}
              </div>
          )
          : null
  )
}
export default Notification