const mongoose = require('mongoose')

const Schema = mongoose.Schema

const violationSchema = new Schema({
  ImagePath: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
  PlateNumber: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Violation', violationSchema)