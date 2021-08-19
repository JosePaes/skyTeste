const User = require('../Models/User');

module.exports = {
  async CreateUser(req, res) {
    const {
      _id,
      nome,
      email,
      senha,
      telefones,
      token,
    } = req.body;

    // let user = new User({
    //   _id, nome, email, senha, token
    // });

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
        return res.status(200).send(user);
      } catch (error) {
        res.status(500).send(error);
      }
    }
    res.status(400).send({ message: 'Email ja existente' });
  },

  async listaUser(req, res) {
    try {
      const users = await User.find({});
      res.status(200).send(users);
    } catch (error) {
      res.status(501).send(error);
    }
  },
};
