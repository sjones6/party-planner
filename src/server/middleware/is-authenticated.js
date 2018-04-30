module.exports = (req, res, next) => {
  !req.isAuthenticated() ? res.status(400).send('INVALID') : next()
}
