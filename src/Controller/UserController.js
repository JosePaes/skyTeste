const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const rdhash = Number(process.env.RD_HASH);

module.exports = {
  async CreateUser(req, res) {
    let {
      // eslint-disable-next-line prefer-const
      nome,
      // eslint-disable-next-line prefer-const
      email,
      senha,
      // eslint-disable-next-line prefer-const
      telefones,
    } = req.body;

    //criando o ID do usuário utilizando o UUID
    const _id = uuidv4();

    //realizando o hash utilizando o bcrypty
    senha = bcrypt.hashSync(senha, rdhash);

    const payload = { _id: User._id };
    const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: 60 * 30 });

    //Verificando se o email ja existe no BD
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
    res.status(400).send({ message: 'E-mail já existente' });
  },

  async listaUser(req, res) {
    try {
      const users = await User.findOne();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ error });
    }
  },
};
