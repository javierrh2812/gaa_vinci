import mongoose from "./mongoose"
import { schemaNames, userRoles } from "../constants"

const User = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   roles: {
      type: String,
      enum: userRoles,
      default: "NORMAL"
   }
})

export default mongoose.model(schemaNames.USER, User)
