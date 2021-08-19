const express = require('express');
const UserController = require('../src/Controller/UserController');

const routes = express.Router();

/* GET home page. */
routes.post('/', UserController.CreateUser);
routes.get('/list', UserController.listaUser);

module.exports = routes;
