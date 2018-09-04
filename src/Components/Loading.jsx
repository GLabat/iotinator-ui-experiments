import React from 'react'

const Loading = props => {
  if (props.error) {
    return (
      <div className="has-background-danger">
        Error while loading custom module component!
        <button onClick={props.retry}>Retry</button>
      </div>
    )
  } else if (props.timedOut) {
    return (
      <div>
        Taking a long time... <button onClick={props.retry}>Retry</button>
      </div>
    )
  } else if (props.pastDelay) {
    return <div>Loading...</div>
  } else {
    return null
  }
}

export default Loading
