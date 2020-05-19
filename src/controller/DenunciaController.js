const Denuncia = require('../model/denuncia')
const Image = require('../model/image')
const multer = require('../config/multer')
const fs = require('fs')

class DenunciaController {

  async post (req, res) {

    try {
      const denuncia = new Denuncia(req.body)
      denuncia.img.data = await fs.readFileSync(req.file.path)
      denuncia.img.contentType = req.file.mimetype
      await denuncia.save()
      return res.status(200).json({ denuncia })
    }
    catch (error) {
      console.log(error.message)
      return res.status(400).send({ message: 'Por algum motivo, a denuncia não foi cadastrado' })
    }
  }

  /*async list(req, res) {
    try {
      const Carro = await Car.find()
      return res.status(200).send({ Carro })
    }
    catch (error) {
      return res.status(400).send({ message: 'Por algum motivo não listamos os veiculos.' })
    }
  }

  async listOne(req, res) {
    try {
      const data = await Car.findById(req.params.id)
        .then(doc => {
          if (!doc) { return res.status(400).end(); }
          return res.status(200).json(doc)
        })
      return data


    }
    catch (error) {
      return res.status(400).send({ message: 'Por algum motivo o id não retornou o carro!' })
    }
  }

  async update(req, res) {
    try {
      const veiculo = await Car.findById(req.params.id)
      const model = veiculo
      model.modelo = req.body.modelo,
        model.marca = req.body.marca,
        model.placa = req.body.placa,
        model.ano = req.body.ano
      model.save()
      return res.status(200).send({ model, message: 'Editou Veiculo com Sucesso!' })
    }
    catch (error) {
      return res.status(400).send({ message: 'Algo deu errado ao tentar alterar o Veiculo!' })
    }
  }

  async delete(req, res) {
    try {
      const veiculo = await Car.findOneAndDelete(req.params.id)
      return res.status(200).send({
        veiculo
      })
    }
    catch (error) {
      return res.status(400).send({
        message: 'Algo deu errado ao deletar o Veiculo!'
      })
    }
  }*/
}

module.exports = new DenunciaController()