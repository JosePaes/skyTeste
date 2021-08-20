const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

module.exports = {
  async login(req, res) {
    const { email, senha } = req.body;
    try {
      //validando usuário e senha
      const user = await User.findOne({ email }).select('+senha');
      if (!user) {
        return res.status(401).send({ message: 'Usuário e/ou senha inválidos' });
      }
      if (!bcrypt.compareSync(senha, user.senha)) {
        return res.status(401).send({ message: 'Usuário e/ou senha inválidos' });
      }
      //definindo o último login do usuario
      user.ultimo_login = Date();
      await user.save();

      const payload = { _id: User._id };
      const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: 60 * 30 });
      user.token = token;
      res.set('authorization', token);
      await user.save();
      return res.status(200).send('Login realizado com Sucesso');
    } catch (error) {
      return res.status(500).send({ message: 'Erro desconhecido' });
    }
  },
};
