const { url } = require('inspector');
const mongoose = require('mongoose');

// Schemas are the structure of our data, and the data types

const itemsSchema = new mongoose.Schema({
    image: String,
    price: Number,
    inventory: Number,
    name: String
    
})

const Items = mongoose.model('Items', itemsSchema)


module.exports = Items;
