const users = require("./api/users");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", express.static("client"));
app.use(users);

app.listen(port, () => console.log(`Listening on port ${port}`));