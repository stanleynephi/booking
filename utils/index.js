//error handler middleware .. this is intednded to catch and process all errors in the system before it reaches the client
function handleError(handler) {
  return function (req, res, next) {
    Promise.resolve(handler(req, res, next)).catch(next)
  }
}

module.exports = { handleError }
