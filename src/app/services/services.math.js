angular.module('services.math', [])
  .service('math', function () {
    this.getRandomInt = function (min, max) {
      return Math.random() * (max - min) + min;
    };

    this.getAngle = function (p1, p2) {
      var angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
      angle = 90 - angle;

      if (angle < 0) {
        angle += 360;
      }
      return angle;
    };
  });
