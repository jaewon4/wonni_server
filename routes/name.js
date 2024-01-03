// routes/names.js
const express = require("express");
const router = express.Router();

let names = []; // 이름을 저장할 배열

// Create
// curl -X POST http://localhost:3000/names -H "Content-Type: application/json" -d '{"name": "John"}'
router.post("/names", (req, res) => {
  const { name } = req.body;
  names.push(name);
  res.status(201).send(`Name ${name} added to the list`);
  console.log(names);
});

// Read
// curl -X GET http://localhost:3000/names
router.get("/names", (req, res) => {
  console.log(names);
  res.status(200).json(names);
  console.log(names);
});

// Update
// curl -X PUT http://localhost:3000/names/John -H "Content-Type: application/json" -d '{"newName": "Bob"}'
router.put("/names/:oldName", (req, res) => {
  const { oldName } = req.params;
  const { newName } = req.body;

  const index = names.indexOf(oldName);
  if (index !== -1) {
    names[index] = newName;
    res.send(`Name updated to ${newName}`);
  } else {
    res.status(404).send("Name not found");
  }
  console.log(names);
});

// Delete
// curl -X DELETE http://localhost:3000/names/Bob
router.delete("/names/:name", (req, res) => {
  const { name } = req.params;
  names = names.filter((n) => n !== name);
  res.send(`Name ${name} removed`);
  console.log(names);
});

module.exports = router;
