import {Schema} from 'mongoose'

const to = {
   virtuals: true,
   transform: (doc, ret, options) => {
      delete ret._id
   }
}

class CustomSchema extends Schema {
   constructor(definition, options) {
      super(definition, options)
      this.set('toObject', to )
      this.set('toJSON', to)
      this.set('timestamps', true)
      this.virtual('id').get(()=>this._id)
   }
}

export default CustomSchema
