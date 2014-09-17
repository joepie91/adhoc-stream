# adhoc-stream

> Hmm. This stream is outputting a bunch of objects, but I really only need one of their attributes. Wouldn't it be handy if I could just do that inline...?

Yes, yes it would.

`adhoc-stream` is a set of utility functions for creating inline, one-off streams, without having to extend a `stream` object.

```coffeescript
someModule = require "some-module"
JSONStream = require "JSONStream"
adhocStream = require "adhoc-stream"

fs.createReadStream "./path/to/some/file"
	.pipe someModule.parseThings()
	.pipe adhocStream.transformSync {objectMode: true}, (obj, encoding) ->
		@push obj.someAttribute
	.pipe JSONStream.stringify(false)
	.pipe process.stdout
```

## API

### .readable(options, func)

Instantiates a `Readable` stream.

* **options**: Same as the `options` parameter for `new stream.Readable`.
* **func**: The function to set as `_read`. Same function signature as for `new stream.Readable`.

### .readableSync(options, func)

Alias for `.readable`. Does nothing special, because `Readable` streams don't need a callback in their `_read` method.

### .writable(options, func)

Instantiates a `Writable` stream.

* **options**: Same as the `options` parameter for `new stream.Writable`.
* **func**: The function to set as `_write`. Same function signature as for `new stream.Writable`.

### .writableSync(options, func)

Same as `.writable`, but automatically calls the `callback` after executing `func`. Useful for one-liners in CoffeeScript. Only usable when your `func` is completely synchronous.

### .transform(options, func)

Instantiates a `Transform` stream.

* **options**: Same as the `options` parameter for `new stream.Transform`.
* **func**: The function to set as `_transofmr`. Same function signature as for `new stream.Transform`.

### .transformSync(options, func)

Same as `.transform`, but automatically calls the `callback` after executing `func`. Useful for one-liners in CoffeeScript. Only usable when your `func` is completely synchronous.

Example:

```coffeescript
fs.createReadStream "./path/to/some/file"
	.pipe adhocStream.transformSync {}, (chunk) -> @push doSomething(chunk)
...
```

### .duplex(options, readFunc, writeFunc)

Instantiates a `Duplex` stream.

* **options**: Same as the `options` parameter for `new stream.Duplex`.
* **readFunc**: The function to set as `_read`. Same function signature as for `new stream.Duplex`.
* **writeFunc**: The function to set as `_write`. Same function signature as for `new stream.Duplex`.

### .duplexSync(options, readFunc, writeFunc)

Same as `.duplex`, but automatically calls the `callback` after executing `writeFunc` (`readFunc` is unaffected). Useful for one-liners in CoffeeScript. Only usable when your `writeFunc` is completely synchronous.
