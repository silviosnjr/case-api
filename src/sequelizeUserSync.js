const sequelize = require('./db');
const User = require('./models/usuarios');

sequelize.sync({ alter: true }) // Usa 'alter: true' para atualizar a tabela sem perder dados
  .then(() => console.log('📦 Banco sincronizado!'))
  .catch(err => console.error('Erro ao sincronizar o banco:', err));
