const normaliseDuration = (periodType, timeToElapse) => {
  if (periodType === 'weeks') return 7 * timeToElapse;
  else if (periodType === 'months') return 30 * timeToElapse;
  else return timeToElapse;
};

function calculateInfectionsByRequestedTime(data, currentlyInfected) {
  const normalisedTimeToElapse = normaliseDuration(
    data.periodType,
    data.timeToElapse
  );
  const factor = parseInt(normalisedTimeToElapse / 3, 10);
  return currentlyInfected * 2 ** factor;
}

const impactEstimator = (data) => {
  const currentlyInfected = data.reportedCases * 10;
  const infectionsByRequestedTime = calculateInfectionsByRequestedTime(
    data,
    currentlyInfected
  );
  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;
  const hospitalBedsByRequestedTime = '';

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };
};

const severeImpactEstimator = (data) => {
  const currentlyInfected = data.reportedCases * 50;
  const infectionsByRequestedTime = calculateInfectionsByRequestedTime(
    data,
    currentlyInfected
  );
  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;
  const hospitalBedsByRequestedTime = '';

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };
};

const covid19ImpactEstimator = (data) => {
  return {
    data,
    impact: impactEstimator(data),
    severeImpact: severeImpactEstimator(data)
  };
};

export default covid19ImpactEstimator;
