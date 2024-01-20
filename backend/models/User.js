const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    meno: {
        type: String,
        require: false,
    },
    priezvisko: {
        type: String,
        reguire: false,
    },
    ulica: {
        type: String,
    },
    mesto: {
        type: String,
    },
    psc: {
        type: String,
    },
    cislo: {
        type: String,
    },

},{timestamps: true});

const User =mongoose.model('Pouzivatel',userSchema );
module.exports = User;