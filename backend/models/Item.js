const mongoose = require('mongoose');

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
    category: {
      type: String,
      require: false,
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