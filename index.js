const dotenv = require("dotenv");

if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env.dev" });
} else if (process.env.NODE_ENV === "staging") {
  dotenv.config({ path: ".env.stage" });
} else dotenv.config({ path: ".env.prod" });

const { SERVER_PORT } = process.env;

const express = require("express");

var cors = require("cors");
const app = express();
const port = SERVER_PORT;

app.use(cors());

app.use(express.json());
// api router
const indexRouter = require("./api/index");
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
