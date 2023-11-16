const express = require("express");
const Admin = require("../models/Admin.js");

//Create
const createAdmin = async (req, res, next) => {
  const newAdmin = new Admin(req.body);
  // res.send("Hello this is admin endpoint!")
  try {
    const savedAdmin = await newAdmin.save();
    res.status(200).json(savedAdmin);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update
const updateAdminById = async (req, res, next) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedAdmin);
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete
const deleteAdminById = async (req, res, next) => {
  try {
    await Admin.deleteOne({ _id: req.params.id });
    res.status(200).json("Admin has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
};

//findById
 const findAdminById = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json(err);
  }
};

//findAll
const findAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createAdmin,
  updateAdminById,
  deleteAdminById,
  findAdminById,
  findAllAdmins
}