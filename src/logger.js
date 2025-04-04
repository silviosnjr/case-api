const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    new transports.Console(), // Exibe no terminal
    new transports.File({ filename: 'logs/errors.log', level: 'error' }), // Salva erros
    new transports.File({ filename: 'logs/requests.log', level: 'info' }) // Salva requisições
  ]
});

module.exports = logger;