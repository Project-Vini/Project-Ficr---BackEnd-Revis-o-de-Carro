const { Router } = require('express')
const UserController = require('../controller/UserController')
const DenunciaController = require('../controller/DenunciaController')
const multerConfig = require('../config/multer')
const multer = require('multer')
//const authMiddleware = require('../middleware/auth')
const app = Router()


// Validation User
app.post('/register', UserController.post);

//app.use(authMiddleware)

app.get('/register', UserController.list);
app.get('/register/:id', UserController.listOne);
app.put('/register/:id', UserController.edit);
// app.delete('/register', UserController.delete);
// app.create('/register', UserController.create);

// Rota de autenticação
app.post('/Authenticate', UserController.Authenticate)

// Rotas Denuncias.
app.post('/denuncia', multer(multerConfig).single('file'), DenunciaController.post)

module.exports = app;
