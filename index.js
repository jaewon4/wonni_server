const express = require("express");
const namesRoutes = require("./routes/name");

var cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use("/", namesRoutes);
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
