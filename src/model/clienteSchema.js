const mongoose = require('mongoose')

const ClienteSchema = new mongoose.Schema({

  name: { type: String, require: true, },
  cpf: { type: String, require: true, unique: true },
  telefone: { type: String, required: true }

})

const Cliente = mongoose.model('Cliente', ClienteSchema)

module.exports = Cliente;