const Cliente = require('../model/clienteSchema')

class ClienteController {

  async post(req, res) {

    const { cpf } = req.body;

    try {
      if (await Cliente.findOne({ cpf }))
        return res.status(400).send({ message: "Cliente já foi cadastrado!" })

      const client = await Cliente.create(req.body)

      return res.send({ client })
    }
    catch (error) {
      return res.status(400).send({ message: 'Algo deu errado a criar o Cliente!' })
    }
  }

  async list(req, res) {
    try {
      const data = await Cliente.find()
      return res.status(200).json({ data })
    }
    catch (error) {
      return res.status(400).send({ message: 'Algo deu errado para listar o Cliente!' })
    }
  }

  async listOne(req, res) {
    try {
      const data = await Cliente.findById(req.params.id)
        .then(doc => {
          if (!doc) { return res.status(400).end(); }
          return res.status(200).json(doc)
        })
      return data

    }
    catch (error) {
      return res.status(400).send({ message: 'Algo deu errado ao listar o Cliente' })
    }
  }

  async update(req, res) {
    try {
      const client = await Cliente.findById(req.params.id)
      const model = client
      model.name = req.body.name,
        model.cpf = req.body.cpf,
        model.telefone = req.body.telefone
      model.save()
      return res.status(200).send({ model, message: 'Editou Cliente!' })
    }
    catch (error) {
      return res.status(400).send({ message: 'Algo deu errado ao tentar alterar o Cliente' })
    }
  }

  async delete(req, res) {
    try {
      const client = await Cliente.findOneAndDelete(req.params.id)
      return res.status(200).send({ client })
    }
    catch (error) {
      return res.status(400).send({ message: 'Algo errado para deletar Cliente' })
    }
  }
}

module.exports = new ClienteController()