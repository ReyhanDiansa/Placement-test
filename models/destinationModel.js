const mongoose = require("mongoose")

const destinationSchema = mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img:{
        type:String,
        required:true
    }
  })

const destinationModel = mongoose.model('destination', destinationSchema)
module.exports = (destinationModel)