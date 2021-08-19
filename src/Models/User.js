const mongoose = require('mongoose');
const connection = require('../../database/config');

connection(mongoose);
const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  senha: {
    type: String,
    required: true,
    select: false,
  },
  telefones: [{
    ddd: {
      type: String,
      required: [true, 'Informe um DDD'],
      min: [2, 'O DDD deve ter 2 digitos no mínimo'],
    },
    numero: {
      type: String,
      required: true,
      min: [8, 'O numero de telefone deve ter no mínimo 8 digitos'],
      max: [9, 'O numero do telefone deve ter no maximo 9 digitos'],
    },
  }, { _id: false }],
  data_criacao: {
    type: Date,
    default: Date.now,
  },
  data_atualizacao: {
    type: Date,
    default: Date.now,
  },
  ultimo_login: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
    default: undefined,
  },
}, { _id: false });

UserSchema.pre('save', (next) => {
  this.updatedAt = Date.now();
  next();
});

// UserSchema.pre('update', () => {
//   this.constructor.update({ _id: this._id }, { $set: { updatedAt: Date.now() } });
// });

// UserSchema.pre('findOneAndUpdate', () => {
//   this.constructor.update({ _id: this._id }, { $set: { updatedAt: Date.now() } });
// });

module.exports = mongoose.model('User', UserSchema);
