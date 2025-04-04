const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./db');
const produtosRoutes = require('./routes/produtos');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.use('/produtos', produtosRoutes);

const authRoutes = require('./routes/auth');
app.use(authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await sequelize.sync();
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
