/**
 * Wrap controller methods in a middleware function that
 * properly allows async/await so all promises are handled
 */
module.exports = controllerMethod => (req, res, next) => {
  Promise.resolve(controllerMethod(req, res, next)).catch(err => {
    res.status(500).json({
      error: ['unable to process this request'],
    })
  })
}
