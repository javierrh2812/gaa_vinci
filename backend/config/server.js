import express from "express"
import mongoose from "../api/models/mongoose"
import cors from "cors"
import apiRoutes from '../api/routes'
export default function () {
   let server = express()
   let createServer, startServer, startSocket

   createServer = config => {
      server.set("env", config.env)
      server.set("port", config.port)
      server.set("hostname", config.hostname)
      server.use("*", cors())
      server.use(express.json())
      server.use(express.urlencoded({ extended: true }))

      mongoose.connect(`${config.db_url}/${config.db_name}`)
   }

   startServer = () => {
      let port = server.get("port")
      let hostname = server.get("hostname")
      server.listen(port, () =>
         console.log(`Server running on http://${hostname}:${port}`)
      )
      server.get("*", (req, res, next) => {
         console.log(`Request was made to: ${req.originalUrl}`)
         return next()
      })

      server.use('/api', apiRoutes) 
   }

   return {
      createServer,
      startServer,
      startSocket
   }
}
