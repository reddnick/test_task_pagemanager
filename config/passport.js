require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const {UserModel} = require('../bin/sequelize');

const cookiesExtractor = function (req, res) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }

    return token;
};

module.exports = function (passport) {
    passport.use(new JwtStrategy({
            jwtFromRequest: cookiesExtractor,
            secretOrKey: process.env.SECRET_KEY
        },
        async function (payload, done) {
            const user = await UserModel.findOne({where: {id: payload.user.id}});
            if (user) {
                return done(null, user);
            }

            return done(null, false);
        }));

    passport.use(new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        (username, password, done) => {
            UserModel.findOne({where: {username}})
                .then(async (user) => {
                    if (!user || !await user.comparePassword(password)) {
                        return done(null, false, {errors: {'username or password': 'is invalid'}});
                    }

                    return done(null, user);
                })
                .catch(done);
        }
    ));
};
