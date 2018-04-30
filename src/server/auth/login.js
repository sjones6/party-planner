const { Strategy } = require('passport-local')

module.exports = (passport, User) => {
  /**
   * Wire password strategy
   */
  passport.use(
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },

      async (email, password, done) => {
        try {
          // For prototype, using plain text passwords and emails.
          // This is a bad security practice for obvious reasons
          const user = await User.findOne({ email, password }).exec()

          if (!user) {
            done(new Error('email/password combination not recognized'))
          } else {
            done(null, user)
          }
        } catch (err) {
          done(err)
        }
      }
    )
  )

  /**
   * Add a serialization function to keep session cookies small
   */
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  /**
   * Add a de-serialization function to load user into req object
   */
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })
}
