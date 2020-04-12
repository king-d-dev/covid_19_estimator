const express = require('express');
const router = express.Router();
const covid19ImpactEstimator = require('./estimator').default;

function covidEstimator(req, res, next) {
  return next();
}

function covidEstimator_POST(req, res, next) {
  console.log(req.body);

  const result = covid19ImpactEstimator(req.body);
  return res.json(result);
}

function jsonEstimator(req, res) {
  return res.json({ message: 'coming soon' });
}

function xmlEstimator(req, res) {
  return res.send('hi xml');
}

// run this middleware for all /api/v1/on-covid-19 routes
router.route('').get(covidEstimator).post(covidEstimator_POST);

router.route('/json').get(covidEstimator).post(covidEstimator_POST);

// router.get('/json', jsonEstimator);
// router.get('/xml', xmlEstimator);

module.exports = router;
