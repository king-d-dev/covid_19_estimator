const express = require('express');
const router = express.Router();
const covid19ImpactEstimator = require('./estimator');

function covidEstimator(req, res, next) {
  return next();
}

function covidEstimatorPOST(req, res) {
  const result = covid19ImpactEstimator(req.body);
  return res.json(result);
}

// run this middleware for all /api/v1/on-covid-19 routes
router.route('').get(covidEstimator).post(covidEstimatorPOST);

router.route('/json').get(covidEstimator).post(covidEstimatorPOST);

module.exports = router;
