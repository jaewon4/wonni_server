const express = require("express");
const router = express.Router();

const usersController = require("./controllers/users");

router.use("/users", usersController);

module.exports = router;
