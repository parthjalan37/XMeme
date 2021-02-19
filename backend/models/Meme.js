const mongoose = require('mongoose');

//Defining the schema for the database
const MemeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Memes',MemeSchema);