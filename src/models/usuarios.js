const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Importa a conexão com o banco

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Validação para garantir formato de e-mail
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Cria automaticamente os campos createdAt e updatedAt
});

module.exports = Usuario;
