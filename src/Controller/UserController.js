const bcrypt = require('bcryptjs');
const User = require('../Models/User');

const rdhash = Number(process.env.RD_HASH);

module.exports = {
  async CreateUser(req, res) {
    let {
      // eslint-disable-next-line prefer-const
      _id,
      // eslint-disable-next-line prefer-const
      nome,
      // eslint-disable-next-line prefer-const
      email,
      senha,
      // eslint-disable-next-line prefer-const
      telefones,
      // eslint-disable-next-line prefer-const
      token,
    } = req.body;

    senha = bcrypt.hashSync(senha, rdhash);

    const emailExiste = await User.findOne({ email });
    if (!emailExiste) {
      try {
        const user = await User.create({
          _id,
          nome,
          email,
          senha,
          telefones,
          token,
        });
        return res.status(201).send(user);
      } catch (error) {
        res.status(500).send({ error });
      }
    }
    res.status(400).send({ message: 'Email ja existente' });
  },

  async listaUser(req, res) {
    try {
      const users = await User.find({});
      res.status(201).send(users);
    } catch (error) {
      res.status(500).send({ error });
    }
  },
};
