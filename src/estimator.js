const normaliseDuration = (data) => {
  if (data.periodType === 'weeks') return 7 * data.timeToElapse;
  if (data.periodType === 'months') return 30 * data.timeToElapse;

  return data.timeToElapse;
};

function calculateInfectionsByRequestedTime(data, currentlyInfected) {
  const factor = parseInt(data.timeToElapse / 3, 10);
  return currentlyInfected * 2 ** factor;
}

const impactEstimator = (data) => {
  // challenge 1
  const currentlyInfected = data.reportedCases * 10;
  const infectionsByRequestedTime = calculateInfectionsByRequestedTime(
    data,
    currentlyInfected
  );

  // challenge 2
  const severeCasesByRequestedTime = parseInt(
    0.15 * infectionsByRequestedTime,
    10
  );
  const availableBeds = 0.35 * data.totalHospitalBeds;
  const hospitalBedsByRequestedTime = parseInt(
    availableBeds - severeCasesByRequestedTime,
    10
  );

  // challenge 3
  const casesForICUByRequestedTime = 0.05 * infectionsByRequestedTime;
  const casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * infectionsByRequestedTime
  );
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = data.region;
  let dollarsInFlight = (infectionsByRequestedTime
      * avgDailyIncomePopulation
      * avgDailyIncomeInUSD)
    / data.timeToElapse;

  dollarsInFlight = parseInt(dollarsInFlight, 10);

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
  // challenge 1
  const currentlyInfected = data.reportedCases * 50;
  const infectionsByRequestedTime = calculateInfectionsByRequestedTime(
    data,
    currentlyInfected
  );

  // challenge 2
  const severeCasesByRequestedTime = parseInt(
    0.15 * infectionsByRequestedTime,
    10
  );
  const availableBeds = 0.35 * data.totalHospitalBeds;
  const hospitalBedsByRequestedTime = parseInt(
    availableBeds - severeCasesByRequestedTime,
    10
  );

  // challenge 3
  const casesForICUByRequestedTime = 0.05 * infectionsByRequestedTime;
  const casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * infectionsByRequestedTime
  );
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = data.region;
  let dollarsInFlight = (infectionsByRequestedTime
      * avgDailyIncomePopulation
      * avgDailyIncomeInUSD)
    / data.timeToElapse;

  dollarsInFlight = parseInt(dollarsInFlight, 10);

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
