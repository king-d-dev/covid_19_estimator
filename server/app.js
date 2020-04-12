const express = require('express');
const http = require('http');
const fs = require('fs');
const logger = require('morgan');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const logStream = fs.createWriteStream('./logs.log', { flags: 'a' });
app.use(
  logger(':method   :url    :status   :response-time ms', {
    stream: logStream
  })
);

app.use('/api/v1/on-covid-19', routes);

const PORT = process.env.PORT || 3000;
http
  .createServer(app)
  .listen(PORT, () => console.log(`server running om port ${PORT}`));
