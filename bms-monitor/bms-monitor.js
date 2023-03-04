export function isOutOfRange(value, lowerLimit, upperLimit) {
  return value < lowerLimit || value > upperLimit;
}

export function batteryIsOk(temperature, soc, charge_rate) {
  const parameters = [
    { name: 'Temperature', value: temperature, lowerLimit: 0, upperLimit: 45 },
    { name: 'State of Charge', value: soc, lowerLimit: 20, upperLimit: 80 },
    { name: 'Charge rate', value: charge_rate, lowerLimit: 0, upperLimit: 0.8 }
  ];

  for (let parameter of parameters) {
    if (isOutOfRange(parameter.value, parameter.lowerLimit, parameter.upperLimit)) {
      console.log(`${parameter.name} is out of range!`);
      return false;
    }
  }
  return true;
}

