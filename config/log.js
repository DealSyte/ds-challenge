import winston from 'winston';

global.winston = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.json({ space: 1 }),
    }),
  ],
});
