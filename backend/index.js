const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passportConfig = require('./passport-config');
const passport = passportConfig.passport;
const ensureAuthenticated = passportConfig.ensureAuthenticated;
const flash = require('connect-flash');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.use(session({
    secret: 'default-secret',
    resave: false,
    saveUninitialized: false,
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session(undefined));



app.get('/getUserEmail', ensureAuthenticated ,(req, res) => {
   console.log("Je autentifikovany" + req.user);
   res.json({ email: req.user.email });
});

const loginRegisterRouter = require('./routes/loginRegister');
const adminPage = require('./routes/adminPage');

app.use('/loginRegister',loginRegisterRouter);
app.use('/adminPage', adminPage);


app.get('/', (req, res) => {
    console.log(req.isAuthenticated());
})

app.get('/test-auth', (req, res) => {
    console.log("Je hehe");
    res.send('Authenticated!');
});

mongoose.connect("mongodb+srv://Daniel:zvhfdPFNilcOzVjf@cluster0.qaxplfa.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Database connected"))
    .catch((err) => {
        console.error("Failed to connect to database.");
        console.error(err);
        process.exit(1);
    });

module.exports = app;