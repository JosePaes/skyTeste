const express = require('express');
const UserController = require('../src/Controller/UserController');
const AuthController = require('../src/Controller/AuthController');
const Autenticate = require('../src/middlewares/authenticate');

const routes = express.Router();

/* GET home page. */
routes.post('/', UserController.CreateUser);
routes.get('/list/:_id', Autenticate, UserController.listaUser);

routes.post('/sign', AuthController.login);
module.exports = routes;
