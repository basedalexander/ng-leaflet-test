angular.module('services.markers', ['services.math'])
  .service('markers', ['math', function (math) {
      var pairsConnections = {
        type: 'multiPolyline',
        latlngs: [],
        weight: '2',
        dashArray: '5, 5',
        color: '#333'
      };

      // Generates pair of markers, connects them with lines
      // and attaches all this to given scope
      this.generatePairs  = function (options) {
        var quantity = options.quantity,
            inBounds = options.inBounds,
            scope = options.scope,
            i,
            markerPrefix = 'm',
            markersCount = 0,
            markers = {},
            m1 = {},
            m2 = {};

        for (i = quantity; i > 0; i = i - 1) {
          m1 = new Marker(inBounds);
          m2 = new Marker(inBounds);

          m1.iconAngle = calculateAngle(m1, m2);
          m2.iconAngle = calculateAngle(m2, m1);

          markers[markerPrefix + ++markersCount] = angular.extend({}, m1);
          markers[markerPrefix + ++markersCount] = angular.extend({}, m2);

          connectPairs(m1, m2);
        }

        scope.markers = markers;
        scope.paths = { multiPolyline: pairsConnections };
        scope.$on('leafletDirectiveMap.map.zoomend', zoomendListener);
      };

      function Marker (inBounds) {
        this.icon = {
          type: 'div',
          html: '<div customMarker><img src="assets/images/icons/marker.svg"></div>',
          iconSize:     [50, 50],
          iconAnchor:   [25, 25]
        };
        this.lat = math.getRandomInt(inBounds.northEast.lat, inBounds.southWest.lat);
        this.lng = math.getRandomInt(inBounds.northEast.lng, inBounds.southWest.lng);
      }

      function calculateAngle (m1, m2) {
        var p1, p2;
        p1 = { x: m1.lng, y: m1.lat };
        p2 = { x: m2.lng, y: m2.lat };
        return math.getAngle(p1, p2);
      }

      function connectPairs (m1, m2) {
        pairsConnections.latlngs.push([
          { lng: m1.lng, lat: m1.lat },
          { lng: m2.lng, lat: m2.lat }
        ]);
      }

      // Adjust markers and polylines for different zoom levels
      function zoomendListener (originalEvent, mapEvent){
        var zoom = mapEvent.leafletObject._zoom;

        if (zoom <= 8) {
          scaleMarker(zoom, 0.001);
          return;
        }
        if ( 8 < zoom  && zoom < 12) {
          scaleMarker(zoom, 0.07);
          hideLines();
          return;
        }
        if (zoom > 12) {
          scaleMarker(zoom, 0.1);
          showLines();
          return;
        }
      }

      function hideLines () {
        $('.leaflet-overlay-pane').addClass('hide');
      }
      function showLines () {
        $('.leaflet-overlay-pane').removeClass('hide');
      }

      function scaleMarker (zoom, times) {
        var scale = zoom * times;
        $('[customMarker]').css('transform', 'scale(' + scale + ','  + scale + ')');
      }
  }]);
