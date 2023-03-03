const { expect } = require('chai');

function isOutOfRange(value, min, max) {
    return value < min || value > max;
}

function batteryIsOk(temperature, soc, charge_rate) {
    const temperatureOutOfRange = isOutOfRange(temperature, 0, 45);
    const socOutOfRange = isOutOfRange(soc, 20, 80);
    const chargeRateOutOfRange = isOutOfRange(charge_rate, 0, 0.8);
    
    if (temperatureOutOfRange) {
        console.log('Temperature is out of range!');
    }

    if (socOutOfRange) {
        console.log('State of Charge is out of range!');
    }

    if (chargeRateOutOfRange) {
        console.log('Charge rate is out of range!');
    }

    return !temperatureOutOfRange && !socOutOfRange && !chargeRateOutOfRange;
}

