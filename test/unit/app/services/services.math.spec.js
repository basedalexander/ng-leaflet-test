describe('services.math', function () {
  var math;

  beforeEach(module('services.math'));
  beforeEach(inject(function(_math_) {
    math = _math_;
  }));

  it('should return random integer between min and max value', function () {
    var min = 44.88093105561462,
        max = 44.99758207601124;

    var result = math.getRandomInt(min, max);
    expect(min <= result && result <= max).toBe(true);
  });

  it('should return right angle in degrees360 from one point to another', function () {
    var p1 = { x: 1, y: 2 },
        p2 = { x: 5, y: 4 };
    expect(math.getAngle(p1, p2)).toBe(63.43494882292201);
    expect(math.getAngle(p2, p1)).toBe(243.434948822922);
  });
});
