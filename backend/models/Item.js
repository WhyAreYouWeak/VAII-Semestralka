const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique:true,
    },
    author:{
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    ISBN: {
        type: String,
        require: true,
        unique: true,
    },
    binding: {
        type: String,
    },
    weight: {
        type: String,
    },
    language: {
        type: String,
    },
    publisher: {
        type: String,
    },
    imageURL: {
        type: String,
    },

}, {timestamps: true});
const Item =mongoose.model('Item', itemSchema);
module.exports = Item;