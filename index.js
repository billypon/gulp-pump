const pump = require('pump');

module.exports = function (fn) {
  return function (cb) {
    const streams = fn();
    if (!streams[streams.length - 1].pipe) {
      const callback = streams.pop();
    }
    pump(streams, !callback ? cb : function () {
      callback();
      cb.apply(this, arguments);
    });
  }
}
