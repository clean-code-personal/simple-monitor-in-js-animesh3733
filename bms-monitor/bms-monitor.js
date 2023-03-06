const WARNING_TOLERANCE_PERCENT = 5;

function isOutOfRange(value, lowerLimit, upperLimit) {
  return value < lowerLimit || value > upperLimit;
}

function getBreachLevel(value, lowerLimit, upperLimit, warningTolerancePercent) {
  const range = upperLimit - lowerLimit;
  const warningTolerance = range * warningTolerancePercent / 100;
  if (isOutOfRange(value, lowerLimit - warningTolerance, upperLimit + warningTolerance)) {
    return value < lowerLimit ? 'LOW_BREACH' : 'HIGH_BREACH';
  } else {
    return 'NORMAL';
  }
}

function getBatteryStatusMessage(breachLevels) {
  const levels = {
    'HIGH_BREACH': 'High breach',
    'HIGH_WARNING': 'Approaching charge-peak',
    'LOW_BREACH': 'Low breach',
    'LOW_WARNING': 'Approaching discharge',
    'NORMAL': 'Normal'
  };
  const messages = breachLevels.map(level => levels[level]);
  return messages.join(' and ');
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
