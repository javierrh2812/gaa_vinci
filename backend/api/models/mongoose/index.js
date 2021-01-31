import mongoose from "mongoose"
import schema from './schema'

mongoose.set("useNewUrlParser", true)
mongoose.set("useCreateIndex", true)
mongoose.set("useUnifiedTopology", true)
mongoose.set("useFindAndModify", false)

mongoose.connection.on("error", error =>
   console.log(`Database error: ${error}`)
)
mongoose.connection.once("open", _ =>{
   if (process.env.NODE_ENV === 'dev') mongoose.set('debug', true)
   console.log(`Connected to database ${process.env.DB_NAME}`)
})

mongoose.Schema = schema

export default mongoose
