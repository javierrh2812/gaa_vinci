//INICIO EXPRESS
const app = require("express")()

//ELEGIMOS PUERTO
const PORT = process.env.PORT || 5000

//INICIAMOS EL SERVIDOR Y LO ASIGNAMOS A UNA CONSTANTE
const server = app.listen(PORT, () =>
   //EMITIMOS UN MENSAJE
   console.log(`Server running on port: ${PORT}`)
)

//RUTAS
app.use(require("./router"))

//CORS
app.use(require("cors")())

//WEBSOCKET
const io = require("socket.io")(server) // inicio el socket

io.on("connection", socket => {
   socket.on("join", ({ name, room }, callback) => {
      //AÑADIMOS AL NUEVO USUARIO CUANDO EMITE LA ACCION JOIN
      //LE PASAMOS A LA FUNCION ADDUSER EL OBJETO {id, name, room}
      const { error, user } = addUser({ id: socket.id, name, room })

      //SI HAY ERROR, RETORNAMOS
      if (error) return callback(error)

      //SI NO HAY NINGUN ERROR, EMITIMOS UN MENSAJE DE BIENVENIDA
      //CON SOCKET.EMIT SOLO SE ENVIA LA ACCION AL SOCKET
      socket.emit("message", {
         user: "admin",
         message: `${user.name}, welcome to te room ${user.room}!`
      })

      //EMITIMOS UN MENSAJE A TODOS LOS USUARIO DEL ROOM
      //CON SOCKET.TO('ROOM') SE ENVIA A TODOS LOS USUARIOS DEL ROOM,
      // MENOS AL SOCKET
      socket.to(user.room).emit("message", {
         user: "admin",
         message: `${user.name} has joined.`
      })

      //AÑADIMOS AL SOCKET A UN ROOM
      socket.join(user.room)

      //CADA VEZ QUE SE UNE UN NUEVO USUARIO, SE ENVIA LA INFO DE
      // LOS USUARIO EN EL ROOM
      io.to(user.room).emit("roomData", {
         room: user.room,
         users: getUsersInRoom(user.room)
      })

      //FINALMENTE REGRESAMOS LA FUNCION
      callback()
   })

   //FUNCION PARA ENVIAR MENSAJE, SE ESPERA LA ACCION 'SENDMESSAGE'
   //Y SE EMITE LA ACCION 'MESSAGE'
   socket.on("sendMessage", (msg, cb) => {
      //BUSCAMOS AL USUARIO, SI EL USUARIO NO ES NULO, EMITIR
      const user = getUser(socket.id)
      if (user)
         io.to(user.room).emit("message", { user: user.name, message: msg })
      else cb("No existe el usuario")
   })

   //funcion para cuando se desconecta un usuario
   // se espera la accion disconnect
   socket.on("disconnect", () => {
      const user = removeUser(socket.id)

      if (user) {
         console.log("user has gone")
         io.to(user.room).emit("message", {
            user: "admin",
            message: `${user.name} has left`
         })
      }
   })

   socket.on("draw", ({ room, point }) => {
      io.to(room).emit("draw", point)
   })

   socket.on("changeColor", ({ room, color }) => {
      console.log("cambiando de color")
      io.to(room).emit("changeColor", color)
   })

   socket.on("changeSize", ({ room, size }) => {
      console.log("cambiando de camaño")
      io.to(room).emit("changeSize", size)
   })

   socket.on("canvasEvent", e => {
      const user = getUser(socket.id)
      if (user) io.to(user.room).emit("canvasEvent", e)
   })
})

const {
   addUser,
   getUser,
   getUsersInRoom,
   removeUser
} = require("./modules/users")
