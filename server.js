import express from 'express';
import config from './config';

require('dotenv').config();

const app = express();

config.setAppConfig(app);

module.exports = config.startServer(app);
