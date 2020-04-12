const fs = require('fs');
const express = require('express');
const xml = require('xml');

const router = express.Router();
const covid19ImpactEstimator = require('../src/estimator');

function covidEstimator(req, res, next) {
  req.result = covid19ImpactEstimator(req.body);
  return next();
}

function getLogs(req, res) {
  fs.readFile('./logs.log', (error, data) => {
    return res.send(data);
  });
}

function resAsJson(req, res) {
  return res.json(req.result);
}

function resAsXml(req, res) {
  res.type('text/xml');

  const resultXml = xml(req.result);
  return res.send(resultXml);
}

router.route('/logs').get(getLogs).post(getLogs);

// run this middleware for all /api/v1/on-covid-19 routes
router.use(covidEstimator);

router.route('/json').get(resAsJson).post(resAsJson);
router.route('/xml').get(resAsXml).post(resAsXml);

module.exports = router;
