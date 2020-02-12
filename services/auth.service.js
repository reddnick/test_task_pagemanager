const passport = require('passport');

module.exports = {
  jwt: passport.authenticate('jwt', {
    session: false
  }),
  local : passport.authenticate('local', {
    session: false,
    failWithError: true
  })
};
