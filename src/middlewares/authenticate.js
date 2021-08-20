const jwt = require('jsonwebtoken');
const moment = require('moment');
const User = require('../Models/User');

module.exports = async (req, res, next) => {
  function DiferencaUltimoLogin(user) {
    const agora = moment(new Date());
    const ultimoLogin = moment(user.ultimo_login);
    const tempoDecorrido = moment.duration(agora.diff(ultimoLogin));
    return tempoDecorrido.asMinutes();
}

  const { _id } = req.params;
  if (!_id) {
    res.status(401).send({ message: 'Por favor, informe o id do usuário.' });
  }

  const user = await User.findOne({ _id });

  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Por favor, envie o token no header da requisição' });
  }
  if (user.token !== token) {
    return res.status(401).json({ message: 'Acesso não autorizado' });
  }

  const tempoUltimoLogin = DiferencaUltimoLogin(user);
  if (tempoUltimoLogin >= 30) {
    return res.status(401).json({ message: 'Sessão inválida' });
  }

  jwt.verify(token, process.env.KEY_JWT, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Não autorizado' });
    next();
  });
};
