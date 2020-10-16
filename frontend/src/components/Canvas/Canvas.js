import React from "react"
import p5 from "p5"
import SketchBar from "./SketchBar/SketchBar.js"
import "./Canvas.css"

class Canvas extends React.Component {
   constructor(props) {
      super(props)

      this.myRef = React.createRef()

      this.state = {
         bgcolor: "#fff",
         color: "#aaa",
         size: 10,
         turno: true
      }
   }

   Sketch = p => {
      let currentPath = []

      p.setup = () => {
         const { socket } = this.props
         p.createCanvas(500, 500)
         p.frameRate(30)
         p.mousePressed = () =>
            this.state.turno ? socket.emit("canvasEvent", "mousePressed") : null

         p.noFill()
         socket.on("draw", draw)
         socket.on("canvasEvent", e => {
            if (e === "mousePressed") currentPath = []
            else if (e === "clearCanvas") p.background(this.state.bgcolor)
            else if (e === "fillBackground") {
               this.setState({ bgcolor: this.state.color }, () =>
                  p.background(this.state.bgcolor)
               )
            } else if (e === "activateEraser") {
               this.setState({ color: this.state.bgcolor })
               p.stroke(this.state.bgcolor)
            }
         })
         socket.on("changeColor", c => {
            this.setState({ color: c })
            p.stroke(c)
         })
         socket.on("changeSize", s => {
            this.setState({ size: s })
            p.strokeWeight(s)
         })
      }

      function draw(point) {
         currentPath.push(point)
         p.beginShape()
         for (let j = 0; j < currentPath.length; j++)
            p.vertex(currentPath[j].x, currentPath[j].y)
         p.endShape()
      }

      p.draw = () => {
         if (this.state.turno) {
            if (p.mouseIsPressed) {
               let point = {
                  x: p.mouseX,
                  y: p.mouseY
               }
               this.props.socket.emit("draw", {
                  room: this.props.room,
                  point: point
               })
            }
         }
      }
   }
   componentDidMount = () => {
      this.myP5 = new p5(this.Sketch, this.myRef.current)
   }

   clearCanvas = () => {
      if (this.state.turno) {
         this.props.socket.emit("canvasEvent", "clearCanvas")
      }
   }

   fillBackground = () => {
      if (this.state.turno) {
         this.props.socket.emit("canvasEvent", "fillBackground")
      }
   }

   activateEraser = () => {
      if (this.state.turno) {
         this.props.socket.emit("canvasEvent", "activateEraser")
      }
   }

   handleColor = c => {
      console.log({
         room: this.props.room,
         color: c
      })
      if (this.state.turno)
         this.props.socket.emit("changeColor", {
            room: this.props.room,
            color: c
         })
   }
   handleSize = s => {
      if (this.state.turno)
         this.props.socket.emit("changeSize", {
            room: this.props.room,
            size: s
         })
   }
   render() {
      return (
         <div className="canvas">
            <SketchBar
               setColor={this.handleColor}
               setSize={this.handleSize}
               clearCanvas={this.clearCanvas}
               fillBackground={this.fillBackground}
               activateEraser={this.activateEraser}
            />
            <div ref={this.myRef}> </div>
         </div>
      )
   }
} //endclass

export default Canvas
