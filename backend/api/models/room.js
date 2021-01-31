import { model } from "./mongoose/mongoose"
import Schema from "./mongoose/schema"
import { user_schema_name, room_schema_name } from "./schemaNames"

const Room = new Schema({
   name: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true,
      default: ""
   },
   users: {
      type: [
         {
            type: Schema.Types.ObjectId,
            ref: user_schema_name
         }
      ],
      default: []
   }
})

export default model(room_schema_name, Room)
