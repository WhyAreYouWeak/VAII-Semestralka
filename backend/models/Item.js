const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique:true,
    },
    price: {
        type: Number,
        require: true,
    },
    ISBN: {
        type: Number,
        require: true,
        unique: true,
    },
    binding: {
        type: String,
    },
    weight: {
        type: Number,
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