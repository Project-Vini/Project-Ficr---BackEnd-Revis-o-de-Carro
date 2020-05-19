const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {

  const authHeader = req.headers.authorization

  if (!authHeader)
    return res.status(401).send({ error: 'O token não foi informado!' })

  const parts = authHeader.split(' ');

  if (!parts.length === 2)
    return res.status(401).send({ error: 'O token está errado!' })


  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token não está completo!' })

  try {
    jwt.verify(token, process.env.APP_TOKEN, (err, decoded) => {
      if (err) return res.status(401).send({ error: 'Token invalido!' })

      req.userId = decoded.id;

      return next()
    })

  }
  catch (error) {
    return res.status(400).send({
      error: 'Algo deu errado.'
    })
  }

}