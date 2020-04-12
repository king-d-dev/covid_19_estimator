const normaliseDuration = (data) => {
  if (data.periodType === 'weeks') return 7 * data.timeToElapse;
  else if (data.periodType === 'months') return 30 * data.timeToElapse;

  return data.timeToElapse;
};

function calculateInfectionsByRequestedTime(data, currentlyInfected) {
  const factor = parseInt(data.timeToElapse / 3, 10);
  return currentlyInfected * 2 ** factor;
}

const impactEstimator = (data) => {
  const currentlyInfected = data.reportedCases * 10;

  const infectionsByRequestedTime = calculateInfectionsByRequestedTime(
    data,
    currentlyInfected
  );

  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;

  const availableBeds = 0.35 * data.totalHospitalBeds;
  const hospitalBedsByRequestedTime =
    availableBeds - severeCasesByRequestedTime;

  const casesForICUByRequestedTime = 0.05 * infectionsByRequestedTime;
  const casesForVentilatorsByRequestedTime = 0.02 * infectionsByRequestedTime;
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = data.region;
  const dollarsInFlight = parseInt(
    (infectionsByRequestedTime *
      avgDailyIncomePopulation *
      avgDailyIncomeInUSD) /
      data.timeToElapse
  );

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const severeImpactEstimator = (data) => {
  const currentlyInfected = data.reportedCases * 50;

  const infectionsByRequestedTime = calculateInfectionsByRequestedTime(
    data,
    currentlyInfected
  );

  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;

  const availableBeds = 0.35 * data.totalHospitalBeds;
  const hospitalBedsByRequestedTime =
    availableBeds - severeCasesByRequestedTime;

  const casesForICUByRequestedTime = 0.05 * infectionsByRequestedTime;
  const casesForVentilatorsByRequestedTime = 0.02 * infectionsByRequestedTime;
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = data.region;
  const dollarsInFlight = parseInt(
    (infectionsByRequestedTime *
      avgDailyIncomePopulation *
      avgDailyIncomeInUSD) /
      data.timeToElapse
  );

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const covid19ImpactEstimator = (data) => {
  // first normalise the timeToElapse even before starting
  data.timeToElapse = normaliseDuration(data);

  return {
    data,
    impact: impactEstimator(data),
    severeImpact: severeImpactEstimator(data)
  };
};

module.exports = covid19ImpactEstimator;
