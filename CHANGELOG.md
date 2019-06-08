# Changelog

## [UNRELEASED channel@0.2.0] - 2019-08-08
### Added
- The `Channel` class now exposes the static methods `Channel.race`, `Channel.merge`, `Channel.zip` and `Channel.latest` (#4).
### Changed
- `close` and `stop` arguments passed to executor are merged as the second argument.
- `stop` resolves to argument passed to `return` if `return` is called.
- `push` function now resolves to the value passed to next
- `push` function now unwraps promise-like values passed to push
- Buffers now throw an error is `remove` is called when the buffer is empty.
- Channel properties and methods which don’t belong to the async iterator interface are now hidden using a private WeakMap.
- Channels stop immediately when the executor throws an error.
- Executor now runs synchronously when `next` is called for the first time (#10).
- The final iteration result/errors are now consumed by iterator methods.
- `return`/`throw` behave more like the methods do for `async generators`.

## [UNRELEASED timers@0.2.0] - 2019-08-08
### Changed
- `delay` now returns an channel which can be reused
- `timeout` returns a channel

## [UNRELEASED limiters@0.2.0] - 2019-08-08
### Added
- throttler can now be passed a `cooldown` boolean option which forces the channel to wait before yielding the final token.
### Changed
- semaphore and throttler now both return channels rather than async iterators.
- throttler function now takes options instead of a number representing limit as the second arg.
- semaphore and throttler will throw a RangeError if limit is less than 1
### Fixed
- throttler now uses a sliding window to limit (#1).

## [UNRELEASED pubsub@0.2.0] - 2019-08-08
### Changed
- type definitions have changed slightly

## [channel@0.1.1] - 2019-05-06
### Added
- Adds throw method to channels.
## [timers@0.1.1] - 2019-04-08
## [limiters@0.1.1] - 2019-04-08
## [pubsub@0.1.1] - 2019-04-08

## [channel@0.1.0] - 2019-04-08
- Initial release.
## [timers@0.1.0] - 2019-04-08
- Initial release.
## [limiters@0.1.0] - 2019-04-08
- Initial release.
## [pubsub@0.1.0] - 2019-04-08
- Initial release.

[channel@0.1.1]: https://github.com/channeljs/channel/compare/@channel/channel@0.1.0...@channel/channel@0.1.1
[timers@0.1.1]: https://github.com/channeljs/channel/compare/@channel/timers@0.1.0...@channel/timers@0.1.1
[limiters@0.1.1]: https://github.com/channeljs/channel/compare/@channel/limiters@0.1.0...@channel/limiters@0.1.1
[pubsub@0.1.1]: https://github.com/channeljs/channel/compare/@channel/pubsub@0.1.0...@channel/pubsub@0.1.1
[channel@0.1.0]: https://github.com/channeljs/channel/releases/tag/@channel/channel@0.1.0
[timers@0.1.0]: https://github.com/channeljs/channel/releases/tag/@channel/timers@0.1.0
[limiters@0.1.0]: https://github.com/channeljs/channel/releases/tag/@channel/limiters@0.1.0
[pubsub@0.1.0]: https://github.com/channeljs/channel/releases/tag/@channel/pubsub@0.1.0
