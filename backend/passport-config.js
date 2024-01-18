const passport = require('passport');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    console.log("pasport use bolo spustene");
    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log("pozivatel neexistuje")
            return done(null, false, { message: 'Invalid email or password.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("email je " + email);
        console.log("isPassportValid" + isPasswordValid);
        if (!isPasswordValid) {
            return done(null, false, { message: 'Invalid email or password.' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    console.log("serializeUser succes.")
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(null, false);
        }
        console.log("Desarialization succes.")
        done(null, user);
    } catch (error) {
        console.error("Error in deserializeUser:", error);
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