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
      write(string) {
        const finalIndex = string.length - 1;
        const lastTabIndex = string.lastIndexOf('\t');
        const str = string.substring(lastTabIndex + 1, finalIndex);
        let time = Math.ceil(parseFloat(str));
        if (time < 10) {
          time = `0${time.toString()}`;
        } else {
          time = time.toString();
        }

        const msg = `${string.substring(0, lastTabIndex + 1)}${time}ms\n`;
        logStream.write(msg);
      }
    }
  })
);

app.use('/api/v1/on-covid-19', routes);

const PORT = process.env.PORT || 3000;
http
  .createServer(app)
  .listen(PORT, () => console.log(`server running om port ${PORT}`));
