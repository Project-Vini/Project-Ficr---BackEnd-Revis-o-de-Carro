const express = require('express')
const router = require('./routes/AllRoutes')
const mongoose = require('mongoose')
require('dotenv').config()

class App {
  constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
    this.database()
  }

  middlewares() {
    this.express.use(express.json())
  }

  routes() {
    this.express.use(router)
  }

  database() {
    mongoose.connect('mongodb://localhost:27017/ProjetoFicr', {
      keepAlive: 1, useUnifiedTopology: true, useNewUrlParser: true
    });
    mongoose.set('useCreateIndex', true)
  }
}

module.exports = new App().express
