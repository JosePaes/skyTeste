const express = require('express');
const UserController = require('../src/Controller/UserController');
const AuthController = require('../src/Controller/AuthController');
const Autenticate = require('../src/middlewares/authenticate');

const routes = express.Router();

routes.post('/create', UserController.CreateUser);
routes.get('/list/:_id', Autenticate, UserController.listaUser);

routes.post('/sign', AuthController.login);
module.exports = routes;
