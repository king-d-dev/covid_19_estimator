const fs = require('fs');
const path = require('path');
const express = require('express');
const EasyXml = require('easyxml');

const router = express.Router();
const covid19ImpactEstimator = require('../src/estimator');

const serializer = new EasyXml({
  manifest: true
});

function covidEstimator(req, res, next) {
  req.result = covid19ImpactEstimator(req.body);
  return next();
}

function getLogs(req, res) {
  fs.readFile(path.join(__dirname, '..', './logs.log'), (error, data) => {
    return res.send(data);
  });
}

function resAsJson(req, res) {
  return res.json(req.result);
}

function resAsXml(req, res) {
  res.type('application/xml');

  return res.send(serializer.render(req.result));
}

router.route('/logs').all(getLogs);

// run this middleware for all /api/v1/on-covid-19 routes except /logs since
// it this appears after that route handler
router.use(covidEstimator);

router.route('/json').get(resAsJson).post(resAsJson);
router.route('/xml').get(resAsXml).post(resAsXml);
router.route('').get(resAsJson).post(resAsJson);

module.exports = router;
