const http = require('http');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
http
  .createServer(app)
  .listen(PORT, () => console.log(`server running on ${PORT}`));
