angular.module('app')
  .controller('MapCtrl', [
    '$scope',
    'markers',
    'MAP_BOUNDS',
    'MARKER_PAIRS_QUANTITY',
    function ($scope, markers, MAP_BOUNDS, MARKER_PAIRS_QUANTITY) {
      $scope.bounds = MAP_BOUNDS;

      markers.generatePairs({
        quantity: MARKER_PAIRS_QUANTITY,
        inBounds: MAP_BOUNDS,
        scope: $scope
      });
  }]);
