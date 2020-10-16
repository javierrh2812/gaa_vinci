import React from 'react'
 
import './Message.css'

const Message = ({message:{ user,message}, name}) => {
    const trimmedName = name.trim().toLowerCase();
    if (user===trimmedName) 
    return (
        <div className="messageContainer">
            <p className="sentText">{trimmedName}</p>
            <div className="messageBox backgroundBlue">
                <p className="messageText colorWhite">{message}</p>
            </div>
         </div>
    )

    else 
    return ( 
        <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
                <p className="messageText colorDark">{message}</p>
            </div>
            <p className="sentText pl-10">{user}</p>
        </div>
    )
}
export default Message
