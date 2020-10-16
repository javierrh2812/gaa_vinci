import React, { Component } from "react"
import io from "socket.io-client"
import Canvas from "../Canvas/Canvas.js"
import Chat from "../Chat/Chat.js"
import queryString from "query-string"
import "./Game.css"

const socketUrl = "localhost:5000"

class Game extends Component {
   constructor(props) {
      super(props)
      this.state = {
         socket: io(socketUrl),
         name: queryString.parse(this.props.location.search).name,
         room: queryString.parse(this.props.location.search).room
      }
      this.initSocket()
   }

   initSocket() {
      const { socket } = this.state
      socket.on("connect", () => {
         console.log("connected", socket.id)
         socket.emit(
            "join",
            { name: this.state.name, room: this.state.room },
            e => {
               if (e) {
                  alert(e)
                  window.history.back()
               }
            }
         )
      })
   }

   componentWillUnmount() {
      return () => {
         this.state.socket.emit("disconnect")
         this.state.socket.off()
      }
   }

   render() {
      const state = this.state
      const socket = state.socket
      const { room } = this.state
      return (
         <div className="game">
            <Canvas socket={socket} room={room} />
            <Chat state={state} />
         </div>
      )
   }
}

export default Game
