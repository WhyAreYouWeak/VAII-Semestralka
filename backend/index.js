const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port =process.env.PORT || 5000
const loginRegisterRouter = require('./routes/loginRegister');
const adminPage =require('./routes/adminPage');
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.use('/loginRegister',loginRegisterRouter);
app.use('/adminPage',adminPage);
app.get('/', (req, res) => {
    res.send('Hello World!')
})
mongoose.connect("mongodb+srv://Daniel:zvhfdPFNilcOzVjf@cluster0.qaxplfa.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Database connected"))
    .catch((err) => {
        console.error("Failed to connect to database.");
        console.error(err);
        process.exit(1);
    });

module.exports = app;