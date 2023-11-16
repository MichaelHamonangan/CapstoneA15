const express = require("express");
const Admin = require("../models/Admin.js");
const controller = require("../controllers/adminController.js");
// const express = require('express');
const router = express.Router();

//Create
router.post("/", controller.createAdmin);

//Update
router.put("/:id", controller.updateAdminById);

//Delete
router.delete("/:id", controller.deleteAdminById);

//findById
router.get("/:id", controller.findAdminById);

//findAll
router.get("/", controller.findAllAdmins);

router.get("/", async (req, res) => {
  res.send("hello this is admin router endpoint!");
});

module.exports = router
