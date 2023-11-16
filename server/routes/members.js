const express = require("express");
const Member = require("../models/Member.js");
const memberController = require("../controllers/memberController.js");

const {
  updateMemberById,
  deleteMemberById,
  findMemberById,
  findAllMembers,
} = memberController;
const { verifyAdmin, verifyToken, verifyUser } = require("../utils/verifyToken.js");
// const express = require('express');
const router = express.Router();

//Create
// router.post("/", controller.create); // already use authentificated register in auth controller

router.get("/checkauthentification", verifyToken, (req, res, next) => {
  res.send("hello member, you are logged in!");
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("hello member, you are logged in and you can edit your profiles");
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send(
    "hello admin, you are logged in and you can manage all members and also all bikes"
  );
});

//Update
// router.put("/:id",  updateMemberById); //testing mode, re-activate auth when token already usable
router.put("/:id", verifyUser, updateMemberById);

//Delete
// router.delete("/:id", deleteMemberById); //testing mdode, re-activate auth when token already usable
router.delete("/:id", verifyUser, deleteMemberById);

//findById
router.get("/:id", findMemberById);

//findAll
router.get("/", verifyAdmin, findAllMembers);

router.get("/", async (req, res) => {
  res.send("hello this is member router endpoint!");
});

module.exports = router
