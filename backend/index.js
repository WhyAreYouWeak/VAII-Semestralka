const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passportConfig = require('./passport-config');
const passport = passportConfig.passport;
const ensureAuthenticated = passportConfig.ensureAuthenticated;
const flash = require('connect-flash');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use(cors({
    origin: "http://127.0.0.1:3000",
    credentials: true
}));


app.use(session({
    secret: 'default-secret',
    resave: false,
    saveUninitialized: false,
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session(undefined));



app.get('/getUserEmail', ensureAuthenticated ,(req, res) => {
   //console.log("Je autentifikovany" + req.user);
   res.json({ email: req.user.email });
});
app.get('/getUserRole', ensureAuthenticated ,(req, res) => {
    res.json({ role: req.user.role});
});

app.get('/getUserId', ensureAuthenticated, (req, res) => {
    //console.log("Get user id je " + req.user._id);
    res.json({ id: req.user._id});
});

const loginRegister = require('./routes/loginRegister');
const adminPage = require('./routes/adminPage');
const productsPage = require('./routes/productsPage');
const reviews = require('./routes/reviews');
const users = require('./routes/users');
const orders = require('./routes/orders');
app.use('/loginRegister',loginRegister);
app.use('/adminPage',  adminPage);
app.use('/products', productsPage);
app.use('/reviews', reviews);
app.use('/users',  users);
app.use('/orders',  orders);
app.get('/', (req, res) => {
    console.log(req.isAuthenticated());
})

mongoose.connect("mongodb+srv://Daniel:zvhfdPFNilcOzVjf@cluster0.qaxplfa.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Database connected"))
    .catch((err) => {
        console.error("Failed to connect to database.");
        console.error(err);
        process.exit(1);
    });

module.exports = app;