const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tilangSchema = new Schema({
  // ID: {
  //   type: String,
  //   required: true,
  // },

  nomorKendaraan: {
    type: String,
    required: true,
  },
  tanggal: {
    type: String,
    required: true,
  },
  lokasi: {
    type: String,
    required: true,
  },
  keterangan: {
    type: String,
    required: true,
  },
  // riderId:{
  //   type: mongoose.Types.ObjectId,
  //   required: false,
  // }
});


module.exports = mongoose.model("Tilang", tilangSchema)