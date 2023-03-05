import { batteryIsOk } from '../bms-monitor/bms-monitor.js';
import { expect } from 'chai';

describe('batteryIsOk', () => {
  it('should return true when all parameters are within the normal range', () => {
    expect(batteryIsOk(25, 70, 0.7)).to.be.true;
  });

  it('should return false when temperature is below lower limit', () => {
    expect(batteryIsOk(-10, 70, 0.7)).to.be.false;
  });

  it('should return false when temperature is above upper limit', () => {
    expect(batteryIsOk(50, 70, 0.7)).to.be.false;
  });

  it('should return false when soc is below lower limit', () => {
    expect(batteryIsOk(25, 10, 0.7)).to.be.false;
  });

  it('should return false when soc is above upper limit', () => {
    expect(batteryIsOk(25, 90, 0.7)).to.be.false;
  });
});

