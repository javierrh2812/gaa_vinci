import React from "react"
import { GithubPicker } from "react-color"
import { Slider } from "@material-ui/core"
import { IconContext } from "react-icons"
import { FaTrashAlt, FaEraser } from "react-icons/fa"
import { RiPaintFill } from "react-icons/ri"
import "./SketchBar.css"

const SketchBar = ({
   setColor,
   setSize,
   clearCanvas,
   fillBackground,
   activateEraser
}) => {
   return (
      <div className="sketchBar">
         <div id="colors">
            <GithubPicker
               width="220px"
               onChange={e => {
                  setColor(e.hex)
               }}
            />
         </div>

         <div id="slider">
            <Slider
               defaultValue={1}
               step={1}
               min={1}
               max={20}
               onChangeCommitted={(e, v) => {
                  setSize(v)
               }}
            />

            <div id="icons">
               <IconContext.Provider value={{ size: "1.30em" }}>
                  <FaTrashAlt
                     onClick={() => {
                        clearCanvas()
                     }}
                  />
                  <RiPaintFill
                     onClick={() => {
                        fillBackground()
                     }}
                  />
                  <FaEraser
                     onClick={() => {
                        activateEraser()
                     }}
                  />
               </IconContext.Provider>
            </div>
         </div>
      </div>
   )
}

export default SketchBar
