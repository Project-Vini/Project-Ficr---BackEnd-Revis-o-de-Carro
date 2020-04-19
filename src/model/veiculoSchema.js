const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({

  modelo: { type: String, require: true, },
  marca: { type: String, require: true, unique: true },
  placa: { type: String, required: true },
  ano: { type: String, required: true }

  // servico: { type: String, required: true },
  // proprietario: { type: String, required: true },


})

const Car = mongoose.model('Car', CarSchema)

module.exports = Car;