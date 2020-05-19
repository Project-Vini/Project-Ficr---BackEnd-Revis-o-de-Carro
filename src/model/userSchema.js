const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

  name: { 
    type: String, 
    require: true, 
  },
  email: { 
    type: String, 
    require: true, 
    unique: true, 
    lowercase: true 
  },
  
  password: { 
    type: String, 
    required: true, 
    select: false, 
  },
  
  cpf: { 
    type: String, 
    required:true,
    unique: true, 
  },
  telefone: { 
    type: String, 
    required: true 
  },
  endereco: {
    type: String, 
    required: true 
  },
  createAdd: { 
    type: Date, 
    default: Date.now, 
  },
  denuncia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Denuncia',
  },


});

/**Metodo responsavel por criptografar a senha. */
UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash;
  next()
})

const User = mongoose.model('User', UserSchema);

module.exports = User;