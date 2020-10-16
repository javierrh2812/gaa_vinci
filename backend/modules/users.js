const users = []

const addUser = ({ id, name, room }) => {
   if (!name || !id || !room) return { error: "Error1" }

   name = name.trim().toLowerCase()
   room = room.trim().toLowerCase()

   const existingUser = users.find(
      user => user.room === room && user.name === name
   )

   if (existingUser) return { error: "Username is taken" }

   const user = { id, name, room, score: 0 }

   users.push(user)

   return { user }
}

const removeUser = id => {
   const index = users.findIndex(u => u.id === id)

   if (index !== -1) {
      //SPLICE ELIMINA A PARTIR DEL INDICE ENVIADO
      //SOLO VAMOS A ELIMINAR UN USUARIO, EL DE ESE INDICE
      //EL MÉTODO RETORNA UN ARRAY, ASI QUE SOLO RETORNAREMOS AL PRIMER ELEMENTO CON [0]
      return users.splice(index, 1)[0]
   }
}

//BUSCAMOS AL USUARIO POR SU ID
const getUser = id => users.find(u => u.id === id)

//OBTENEMOS TODOS LOS USUARIOS
const getUsersInRoom = room => users.filter(u => u.room === room)

//EXPORTAMOS TODOS LOS MÉTODOS PARA QUE SEAN ACCESIBLES DESDE LA APLICACIÓN PRINCIPAL
module.exports = { addUser, removeUser, getUser, getUsersInRoom }
