const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Se estiver usando hash de senha
const User = require('../models/usuarios'); // Importando o modelo de usuário
require('dotenv').config();
const logger = require('../logger');

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // 1️⃣ Verifica se o usuário existe no banco
    const user = await User.findOne({ where: { email } });
    if (!user) {
      logger.info(`Usuário não encontrado: ${user.email}`);
      return res.status(400).json({error: 'Usuário não encontrado'})
    };

    // 2️⃣ (Opcional) Se a senha estiver criptografada, compare com bcrypt
    // const senhaValida = await bcrypt.compare(senha, user.senha);
    // if (!senhaValida) return res.status(400).json({ error: 'Senha inválida' });

    // 3️⃣ (Sem bcrypt) Se a senha for armazenada sem hash, apenas compare
    if (user.senha !== senha){
      logger.erro(`Senha inválida: ${user.senha}`);
      return res.status(400).json({ error: 'Senha inválida' });
    }

    // 4️⃣ Gera o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // O token expira em 1 hora
    );

    // 5️⃣ Retorna o token
    res.json({ token });

  } catch (error) {
    logger.error(`Erro ao logar: ${error.message}`); 
    res.status(500).json({ error: 'Erro no servidor' });
  }
};
