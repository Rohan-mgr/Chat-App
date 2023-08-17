const express = require("express");
const isAuth = require("../middleware/isAuth");
const chatController = require("../controllers/chat");
const router = express.Router();

router.post("/:id", isAuth, chatController.handleChat);

module.exports = router;
