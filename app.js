const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const connection = require('./database/config');

const usersRouter = require('./routes/users');

connection(mongoose);
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Endpoint não encontrado.' });
});
module.exports = app;
