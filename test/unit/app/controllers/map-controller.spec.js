describe('MapCtrl', function() {
  var $controller,
      $rootScope,
      markers = {
        generatePairs: function () {}
      },
      MAP_BOUNDS,
      MARKER_PAIRS_QUANTITY,
      controller,
      scope;

  beforeEach(module('app'));
  beforeEach(inject(function(_$controller_, _$rootScope_, _MAP_BOUNDS_, _MARKER_PAIRS_QUANTITY_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    MAP_BOUNDS = _MAP_BOUNDS_;
    MARKER_PAIRS_QUANTITY = _MARKER_PAIRS_QUANTITY_;
    spyOn(markers, 'generatePairs');
  }));

  it('appends the scope with proper bound property', function () {
    var scope = $rootScope.$new();
    var controller = $controller('MapCtrl', {
      $scope: scope,
      markers: markers,
      MAP_BOUNDS: MAP_BOUNDS,
      MARKER_PAIRS_QUANTITY: MARKER_PAIRS_QUANTITY
    });
    expect(scope.bounds).toBe(MAP_BOUNDS);
  });

  it('calls generatePairs method', function () {
    var scope = $rootScope.$new();
    var controller = $controller('MapCtrl', {
      $scope: scope,
      markers: markers,
      MAP_BOUNDS: MAP_BOUNDS,
      MARKER_PAIRS_QUANTITY: MARKER_PAIRS_QUANTITY
    });
    expect(markers.generatePairs).toHaveBeenCalledTimes(1);
  });
});
