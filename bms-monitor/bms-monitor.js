const WARNING_TOLERANCE_PERCENT = 5;

function isOutOfRange(value, lowerLimit, upperLimit) {
  return value < lowerLimit || value > upperLimit;
}

function getBreachLevel(value, lowerLimit, upperLimit, warningTolerancePercent) {
  const range = upperLimit - lowerLimit;
  const warningTolerance = range * warningTolerancePercent / 100;
  if (value < lowerLimit) {
    return 'LOW_BREACH';
  } else if (value <= lowerLimit + warningTolerance) {
    return 'LOW_WARNING';
  } else if (value >= upperLimit - warningTolerance) {
    return 'HIGH_WARNING';
  } else if (value > upperLimit) {
    return 'HIGH_BREACH';
  } else {
    return 'NORMAL';
  }
}

function getBatteryStatusMessage(breachLevels) {
  let message;
  if (breachLevels.some(level => level === 'HIGH_BREACH')) {
    message = 'High breach';
  } else if (breachLevels.some(level => level === 'HIGH_WARNING')) {
    message = 'Approaching charge-peak';
  } else if (breachLevels.some(level => level === 'LOW_BREACH')) {
    message = 'Low breach';
  } else if (breachLevels.some(level => level === 'LOW_WARNING')) {
    message = 'Approaching discharge';
  } else {
    message = 'Normal';
  }
  return message;
}

export function batteryIsOk(temperature, soc, charge_rate) {
  const parameters = [
    { name: 'Temperature', value: temperature, lowerLimit: 0, upperLimit: 45 },
    { name: 'State of Charge', value: soc, lowerLimit: 20, upperLimit: 80 },
    { name: 'Charge rate', value: charge_rate, lowerLimit: 0, upperLimit: 0.8 }
  ];

  const breachLevels = parameters.map(parameter => {
    const warningTolerancePercent = parameter.upperLimit * WARNING_TOLERANCE_PERCENT / 100;
    return getBreachLevel(parameter.value, parameter.lowerLimit, parameter.upperLimit, warningTolerancePercent);
  });

  const batteryStatusMessage = getBatteryStatusMessage(breachLevels);
  console.log(`Battery status: ${batteryStatusMessage}`);

  return !breachLevels.some(level => level === 'LOW_BREACH' || level === 'HIGH_BREACH');
}

