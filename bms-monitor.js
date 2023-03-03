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
    if (isTemperatureOutOfRange(temperature)) {
        console.log('Temperature is out of range!');
        return false;
    }

    if (isSocOutOfRange(soc)) {
        console.log('State of Charge is out of range!');
        return false;
    }

    if (isChargeRateOutOfRange(charge_rate)) {
        console.log('Charge rate is out of range!');
        return false;
    }

    return true;
}


expect(batteryIsOk(25, 70, 0.7)).to.be.true;
expect(batteryIsOk(-10, 70, 0.7)).to.be.false;
expect(batteryIsOk(50, 70, 0.7)).to.be.false;
expect(batteryIsOk(25, 10, 0.7)).to.be.false;
expect(batteryIsOk(25, 90, 0.7)).to.be.false;
expect(batteryIsOk(25, 70, 1)).to.be.false;
expect(batteryIsOk(25, 70, 0.8)).to.be.true;
expect(batteryIsOk(0, 20, 0)).to.be.true;
expect(batteryIsOk(45, 80, 0.8)).to.be.true;
