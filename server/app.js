const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');
const logger = require('morgan');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const logStream = fs.createWriteStream(
  path.join(__dirname, '..', './logs.log'),
  {
    flags: 'a'
  }
);
app.use(
  logger(':method\t:url\t:status\t:response-time', {
    stream: {
      write(logString) {
        const lastTabIndex = logString.lastIndexOf('\t');
        let time = logString.substring(lastTabIndex + 1);
        time = Math.ceil(time);
        time = time < 10 ? `0${time}` : time;

        logStream.write(
          `${logString.substring(0, lastTabIndex + 1)}${time}ms\n`
        );
      }
    }
  })
);

app.use('/api/v1/on-covid-19', routes);

const PORT = process.env.PORT || 3000;
http
  .createServer(app)
  .listen(PORT, () => console.log(`server running om port ${PORT}`));
