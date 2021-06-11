const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BinSchema = new Schema({
    content: { type: String, trim: true },
}, { timestamps: true })

var Bin = mongoose.model('Bin', BinSchema)
module.exports = Bin