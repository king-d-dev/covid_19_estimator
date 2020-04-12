const http = require('http');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/on-covid-19', require('./routes'));

const PORT = process.env.PORT || 3000;
http.createServer(app).listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.clear();
    console.log(`server running on ${PORT}`);
  }
});
