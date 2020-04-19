const Car = require('../model/veiculoSchema')

class CarController {

  async post(req, res) {
    try {
      const Carro = await Car.create(req.body)
      res.status(200).send({ Carro })
    }
    catch (error) {
      const Carro = await Car.req.body
      console.log(Carro)
      return res.status(400).send({ message: 'Por algum motivo, o veiculo não foi cadastrado' })
    }
  }

  async list(req, res) {
    try {
      const Carro = await Car.find()
      return res.status(200).send({ Carro })
    }
    catch (error) {
      return res.status(400).send({ message: 'Por algum motivo não listamos os veiculos.' })
    }
  }

  async listQuery(req, res) {
    try {
      const { modelo, marca, placa, ano } = await Car.find(req.query)

      const response = Promise.all({
        modelo,
        marca,
        placa,
        ano
      })

      return response
    }
    catch (error) {
      return res.status(400).send({ message: 'Por algum motivo o id não retornou o carro!' })
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

}

module.exports = new CarController()