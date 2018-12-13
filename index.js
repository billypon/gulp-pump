const pump = require('pump');

module.exports = function (fn) {
  return function (cb) {
    const streams = fn();
    let callback;
    if (!streams[streams.length - 1].pipe) {
      callback = streams.pop();
    }
    pump(streams, !callback ? cb : function () {
      callback();
      cb.apply(this, arguments);
    });
  }
}
