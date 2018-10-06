const expect = require('expect');
const utils = require('./utils');

test('Should add 33 to 11', () => {
    expect(utils.add(33, 11)).toBe(44);
  });

test('Should square 12', () => {
    expect(utils.square(12)).toBe(144);
});
