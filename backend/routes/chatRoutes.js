const express = require("express");
const { getAIResponse } = require("../controllers/chatController");

const router = express.Router();

router.post("/chat", getAIResponse); // Define chat endpoint

module.exports = router;
