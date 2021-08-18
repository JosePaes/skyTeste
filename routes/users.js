const express = require('express');

const routes = express.Router();

/* GET home page. */
routes.get('/', (req, res) => {
  res.json({ teste: 'oi' });
});

module.exports = routes;
