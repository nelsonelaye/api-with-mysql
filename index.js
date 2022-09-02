require("./config/mysql");
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.end("Creating my first API with MySQL database");
});

app.use("/api", require("./router/user"));

app.listen(process.env.PORT || `2000`, () => {
  console.log("listening to port");
});
