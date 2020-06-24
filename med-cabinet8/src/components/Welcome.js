import React from 'react'

const Welcome = ({username}) => {
    return(
        <div className="welcome">
        <h1>Welcome {username}</h1>
        <p>You don't have any saved profiles</p>
        <p>Click here to get started</p>
        </div>
    )
}

export default Welcome;