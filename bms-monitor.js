const { expect } = require('chai');

function isTemperatureOutOfRange(temperature) {
  return temperature < 0 || temperature > 45;
}

function isSocOutOfRange(soc) {
  return soc < 20 || soc > 80;
}

function isChargeRateOutOfRange(charge_rate) {
  return charge_rate > 0.8;
}

function batteryIsOk(temperature, soc, charge_rate) {
  let status = 'OK';
  let details = {};

  if (isTemperatureOutOfRange(temperature)) {
    status = 'Temperature out of range';
    details.temperature = temperature;
  }

  if (isSocOutOfRange(soc)) {
    status = 'State of Charge out of range';
    details.soc = soc;
  }

  if (isChargeRateOutOfRange(charge_rate)) {
    status = 'Charge rate out of range';
    details.charge_rate = charge_rate;
  }

  return { status, details };
}

expect(batteryIsOk(25, 70, 0.7)).to.deep.equal({ status: 'OK', details: {} });
expect(batteryIsOk(-10, 70, 0.7)).to.deep.equal({ status: 'Temperature out of range', details: { temperature: -10 } });
expect(batteryIsOk(50, 70, 0.7)).to.deep.equal({ status: 'Temperature out of range', details: { temperature: 50 } });
expect(batteryIsOk(25, 10, 0.7)).to.deep.equal({ status: 'State of Charge out of range', details: { soc: 10 } });
expect(batteryIsOk(25, 90, 0.7)).to.deep.equal({ status: 'State of Charge out of range', details: { soc: 90 } });
expect(batteryIsOk(25, 70, 1)).to.deep.equal({ status: 'Charge rate out of range', details: { charge_rate: 1 } });
expect(batteryIsOk(25, 70, 0.8)).to.deep.equal({ status: 'OK', details: {} });
expect(batteryIsOk(0, 20, 0)).to.deep.equal({ status: 'OK', details: {} });
expect(batteryIsOk(45, 80, 0.8)).to.deep.equal({ status: 'OK', details: {} });
