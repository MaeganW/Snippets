var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});

describe('Math', function () {
  describe('multiply', function () {
    it('should equal 9 when multiplying 3*3', function () {
      assert.equal(9, 3 * 3);
    })
  })
  describe('subtract and multiply', function () {
    it('should subtract and then multiply', function () {
      assert.equal(-8, (3 - 4) * 8);
    })
  })
})