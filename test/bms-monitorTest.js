import { batteryIsOk } from '../bms-monitor/bms-monitor.js';
import { expect } from 'chai';

expect(batteryIsOk(25, 70, 0.7)).to.be.true;
expect(batteryIsOk(-10, 70, 0.7)).to.be.false;
expect(batteryIsOk(50, 70, 0.7)).to.be.false;
expect(batteryIsOk(25, 10, 0.7)).to.be.false;
expect(batteryIsOk(25, 90, 0.7)).to.be.false;
expect(batteryIsOk(25, 70, 1)).to.be.false;
expect(batteryIsOk(25, 70, 0.8)).to.be.true;
expect(batteryIsOk(0, 20, 0)).to.be.true;
expect(batteryIsOk(45, 80, 0.8)).to.be.true;
