const express = require('express');
const http = require('http');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/on-covid-19', routes);

const PORT = process.env.PORT || 3000;
http.createServer(app).listen(PORT);
