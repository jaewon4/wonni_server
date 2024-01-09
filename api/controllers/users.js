const express = require("express");
const router = express.Router();
const userQueries = require("../../db/query/users");

// Read
// curl -X GET http://localhost:5555/users
router.get("/", (req, res) => {
  console.log("GET /users");
  userQueries.getAllUsers((error, results) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.status(200).json(results);
  });
});

// Create
// curl -X POST http://localhost:5555/users -H "Content-Type: application/json" -d '{"name": "John"}'
router.post("/", (req, res) => {
  console.log("POST /users");
  const { name } = req.body;
  userQueries.addUser(name, (error, results) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.status(201).send(`Name ${name} added with ID ${results.insertId}`);
  });
});

// Update
// curl -X PUT http://localhost:5555/users/1 -H "Content-Type: application/json" -d '{"newName": "Alice"}'
router.put("/:userId", (req, res) => {
  console.log("PUT /users/:userId");
  const { userId } = req.params;
  const { newName } = req.body;

  userQueries.updateUser(userId, newName, (error, results) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("User not found");
    }
    res.send(`User ID ${userId} updated to name ${newName}`);
  });
});

// Delete
// curl -X DELETE http://localhost:5555/users/2
router.delete("/:userId", (req, res) => {
  console.log("DELETE /users/:userId");
  const { userId } = req.params;

  userQueries.deleteUser(userId, (error, results) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("User not found");
    }
    res.send(`User ID ${userId} removed`);
  });
});

module.exports = router;
