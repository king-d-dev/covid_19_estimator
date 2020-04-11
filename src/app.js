const http = require('http');
const express = require('express');

const app = express();

app.use('/api/v1/on-covid-19', require('./routes'));

const PORT = process.env.PORT || 3000;
http
  .createServer(app)
  .listen(PORT, () => console.log(`server running on ${PORT}`));
