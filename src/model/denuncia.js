const mongoose = require('mongoose')

const DenunciaSchema = new mongoose.Schema({

  Address: { 
    type: String, 
    required: true,
  },

  Neighborhood: { 
    type: String, 
    required: true, 
    //unique: true 
  },

  Reference: { 
    type: String, 
    required: true 
  },

  Brand: {
    type: String,
    required: true,
  },

  Motor: {
    type: String,
    required: true,
  },

  Board: {
    type: String,
    required: true,
  },

  mail: {
    type: String,
    required: true
  },

  img: {
    data: {type: Buffer},
    contentType: {type: String },
  },
  Images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]

})

const Denuncia = mongoose.model('Denuncia', DenunciaSchema)

module.exports = Denuncia;