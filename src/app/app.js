angular.module('app', [
  'leaflet-directive',
  'services.math',
  'services.markers'
  ])

  .constant('MARKER_PAIRS_QUANTITY', 5)

  .value('MAP_BOUNDS', {
    northEast: {
      lat: 44.99758207601124,
      lng: 34.23511505126953
    },
    southWest: {
      lat: 44.88093105561462,
      lng: 33.95805358886719
    }
  });
