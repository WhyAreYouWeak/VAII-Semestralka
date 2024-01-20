const mongose = require('mongoose');

const categorySchema = new mongose.Schema ({
    name: {
        type: String,
        require: true,
        unique: true,
    },
}, {timestamps: true});
const Category =  mongose.model('Category', categorySchema);
module.exports = Category;