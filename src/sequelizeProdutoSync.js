const sequelize = require('./db');
const Produto = require('./models/produtos');

sequelize.sync().then(() => console.log('📦 Banco sincronizado!'));