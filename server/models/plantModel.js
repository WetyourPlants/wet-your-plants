const mongoose = require('mongoose')
const Schema = mongoose.Schema

const plantSchema = new Schema({
    name: {type: String, required: true, unique: true},
    imageUrl: {type: String},
    desc: {type: String},
    schedule: {type: String},
})

module.exports = mongoose.model('plant', plantSchema);