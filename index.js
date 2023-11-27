const express = require("express");
var cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  console.log("test ok!!");
  res.send("Hello World!");
});

app.get("/dog", (req, res) => {
  res.json({ name: "멍멍이", age: 2, type: "dog" });
});

app.get("/cat", (req, res) => {
  res.json({ name: "야옹이", age: 3, type: "cat" });
});

app.get("/user/:id", (req, res) => {
  // get에서 변수를 받는 방식 1. params, 2. query
  // 1. params => 요청하는 주소에 변수를 넣어서 보내는 방식 localhost:3000/user/1
  //   const q = req.params;
  //   console.log(q.id);

  // 2. query => 요청하는 주소에 변수를 넣어서 보내는 방식 localhost:3000/user?id=1&name=lee&age=20
  const q = req.query;
  console.log(q.id);
  console.log(q.name);
  console.log(q.age);

  res.json({ userid: q.id });
});

app.get("/sound/:name", (req, res) => {
  const { name } = req.params;
  if (name === "dog") {
    res.json({ sound: "멍멍" });
  } else if (name === "cat") {
    res.json({ sound: "야옹" });
  } else {
    res.json({ sound: "???" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
