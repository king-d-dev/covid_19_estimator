const fs = require('fs');
const express = require('express');

const router = express.Router();
const covid19ImpactEstimator = require('../src/estimator');

function covidEstimator(req, res, next) {
  return next();
}

function covidEstimatorPOST(req, res) {
  const result = covid19ImpactEstimator(req.body);
  return res.json(result);
}

function getLogs(req, res) {
  fs.readFile('./logs.log', (error, data) => {
    return res.send(data);
  });
}

router.route('/logs').get(getLogs).post(getLogs);

// run this middleware for all /api/v1/on-covid-19 routes
router.use(covidEstimator);

router.route('/json').get(covidEstimatorPOST).post(covidEstimatorPOST);
router.route('/xml').get(covidEstimatorPOST).post(covidEstimatorPOST);

module.exports = router;
