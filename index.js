var methods, stream;

stream = require("stream");

methods = {
  readable: function(options, func) {
    var streamObj;
    streamObj = new stream.Readable(options);
    streamObj._read = func;
    return streamObj;
  },
  writable: function(options, func) {
    var streamObj;
    streamObj = new stream.Writable(options);
    streamObj._write = func;
    return streamObj;
  },
  transform: function(options, func) {
    var streamObj;
    streamObj = new stream.Transform(options);
    streamObj._transform = func;
    return streamObj;
  },
  duplex: function(options, readFunc, writeFunc) {
    var streamObj;
    streamObj = new stream.Duplex(options);
    streamObj._read = readFunc;
    streamObj._write = writeFunc;
    return streamObj;
  },
  readableSync: this.readable,
  writableSync: function(options, func) {
    return this.writable(options, function(chunk, encoding, callback) {
      func.call(this, chunk, encoding, callback);
      return callback();
    });
  },
  transformSync: function(options, func) {
    return this.transform(options, function(chunk, encoding, callback) {
      func.call(this, chunk, encoding, callback);
      return callback();
    });
  },
  duplexSync: function(options, readFunc, writeFunc) {
    return this.duplex(options, readFunc, function(chunk, encoding, callback) {
      writeFunc.call(this, chunk, encoding, callback);
      return callback();
    });
  }
};

module.exports = methods;
