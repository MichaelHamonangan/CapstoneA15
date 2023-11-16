const mongoose = require('mongoose')
const { Schema } = mongoose;

const adminSchema = new mongoose.Schema({
  // idAdmin: {
  //   type: String,
  //   required: true,
  // },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admin", adminSchema)
