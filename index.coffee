stream = require "stream"

methods =
	readable: (options, func) ->
		streamObj = new stream.Readable(options)
		streamObj._read = func
		return streamObj
	writable: (options, func) ->
		streamObj = new stream.Writable(options)
		streamObj._write = func
		return streamObj
	transform: (options, func) ->
		streamObj = new stream.Transform(options)
		streamObj._transform = func
		return streamObj
	duplex: (options, readFunc, writeFunc) ->
		streamObj = new stream.Duplex(options)
		streamObj._read = readFunc
		streamObj._write = writeFunc
		return streamObj

	# Convenience methods
	readableSync: @readable # This has no callback method...
	writableSync: (options, func) ->
		@writable options, (chunk, encoding, callback) ->
			func.call(this, chunk, encoding, callback)
			callback()
	transformSync: (options, func) ->
		@transform options, (chunk, encoding, callback) ->
			func.call(this, chunk, encoding, callback)
			callback()
	duplexSync: (options, readFunc, writeFunc) ->
		@duplex options, readFunc, (chunk, encoding, callback) ->
			writeFunc.call(this, chunk, encoding, callback)
			callback()

module.exports = methods
