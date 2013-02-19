// Generated by CoffeeScript 1.3.3
(function() {
  var bearingS, bearingSmoothS, bearingToPosition, directionS, f, ratioBetweenBearings;

  f = {
    floor: function(v) {
      return Math.floor(v);
    }
  };

  directionS = $(window).asEventStream('deviceorientation').map('.originalEvent');

  bearingS = directionS.map(function(ev) {
    return ev.alpha;
  });

  bearingSmoothS = bearingS.slidingWindow(1).map(function(vs) {
    return _.inject(vs, (function(s, n) {
      return s + n;
    }), 0) / vs.length;
  });

  bearingS.map(f.floor).assign($('.bearing-smooth'), 'text');

  bearingSmoothS.map(f.floor).assign($('.bearing'), 'text');

  ratioBetweenBearings = function(value, range) {
    var lower, upper;
    lower = range[0], upper = range[1];
    if (lower < 0) {
      lower += 360;
    }
    if (upper < 0) {
      upper += 360;
    }
    if (lower < upper) {
      lower += 360;
    }
    if (lower < upper) {
      lower += 360;
    }
    return value += 360;
  };

  bearingToPosition = function(camera, bearing) {
    var domain, range, scale, viewWindow, width;
    viewWindow = 90;
    width = 500;
    domain = [(camera - viewWindow / 2) % 360, (camera + viewWindow / 2) % 360];
    console.log(domain);
    range = [0, 500];
    scale = d3.scale.linear().domain(domain).range(range);
    return scale(bearing);
  };

  $('.screen h1').each(function() {
    var $el, pos;
    $el = $(this);
    pos = $el.data('deg');
    return bearingSmoothS.onValue(function(camera) {
      var left;
      left = bearingToPosition(camera, pos);
      return $el.css({
        left: left
      });
    });
  });

}).call(this);
