const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    date: Date,
    title: String,
    description: String,
    text: String
});

module.exports = mongoose.model('News', newsSchema);