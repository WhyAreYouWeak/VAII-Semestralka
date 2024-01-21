const passport = require('passport');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
          console.log("neplatny email alebo heslo");
            return done(null, false, { message: 'Neplatny email alebo heslo' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("neplatny email alebo heslo");
            return done(null, false, { message: 'Neplatny email alebo heslo' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(null, false);
        }
        //console.log("Desarialization succes.")
        done(null, user);
    } catch (error) {
        //console.error("Error in deserializeUser:", error);
        done(error);
    }
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).send("Nie je autorizovany");
    }
}
module.exports = {
    passport: passport,
    ensureAuthenticated: ensureAuthenticated
};