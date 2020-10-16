import React, { useEffect, useState } from 'react'
import './Chat.css'
import InfoBar from './InfoBar/InfoBar.js'
import Messages from './Messages/Messages'
import Input from './Input/Input.js'


const Chat = ({state}) => {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        state.socket.on('message', msg => {
            setMessages([...messages, msg])
        }) 
    }, [messages, state.socket])

    const sendMessage = e => {
        e.preventDefault()
        if (message) state.socket.emit('sendMessage', message, () => setMessage(''))
    }

    return (
        <div className="chatContainer">
            <div className="chat">
                <InfoBar room={state.room} />
                <Messages messages={messages} name={state.name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}
export default Chat