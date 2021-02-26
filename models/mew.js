const mongoose = require('mongoose');

const mewSchema = new mongoose.Schema({
    name: String,
    content: String,
}, {
    timestamps: true
});

const Mew = mongoose.model('Mew', mewSchema);

module.exports = Mew;