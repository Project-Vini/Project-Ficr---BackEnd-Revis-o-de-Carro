const User = require('../model/userSchema')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {

  // Inserir usuario e criptografando sua senha e autenticando.
  async post(req, res) {
    const { email } = req.body;

    try {

      if (await User.findOne({ email }))
        return res.status(400).send('Usuario já foi cadastrado com esté email.');

      const user = await User.create(req.body)

      user.password = undefined;

      const token = jwt.sign({ id: user.id }, process.env.APP_TOKEN, {
        expiresIn: 86400,
      });

      return res.send({ user, token })
    }
    catch (error) {
      return res.status(400).send({ error: 'Erro ao registrar!' })
    }
  }

  // Pegar apenas um usuario por Id.
  async listOne(req, res) {

    try {
      const data = await User.findById(req.params.id)
        .then(doc => {
          if (!doc) { return res.status(400).end(); }
          return res.status(200).json(doc)
        })
      return data
    }
    catch (error) {
      return res.status(400).send({ message: 'Este usuario não existe!' })
    }
  }

  // Pegar todos os usuarios cadastrados.
  async list(req, res) {
    try {
      const data = await User.find()

      return res.status(200).json({ data });
    }
    catch (error) {
      return res.status(400).send({ error: 'Erro ao registrar!' })
    }
  }

  async edit(req, res) {
    try {
      const data = await User.update(req.params.id)
        .then(doc => {
          if (!doc) { return res.status(400).end(); }
          console.log("Data: " + data)
          return res.status(200).json(doc)
        })
      return data
    }
    catch (error) {
      const data = await User.update(req.params.id)
      console.log(data)
      return res.status(400).send({ message: 'Erro ao alterar usuario!' })
    }
  }

  // Autenticação de Usuario
  async Authenticate(req, res) {
    const { email, password } = req.body

    try {
      const user = await User.findOne({ email }).select('+password')

      if (!user)
        return res.status(400).send('Usuario não encontrado.')

      if (!await bcryptjs.compare(password, user.password))
        return res.status(400).send('Senha Invalida.')

      user.password = undefined;

      const token = jwt.sign({ id: user.id }, process.env.APP_TOKEN, {
        expiresIn: 86400,
      });

      res.send({ user, token });

    }
    catch (error) {
      return res.status(400).send({ error: 'Erro no token!' })
    }
  }
}

module.exports = new UserController();

