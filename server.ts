const graphqlApi = require("./api/graphqlApi");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/graphql", graphqlApi);

app.listen(port, () => console.log(`Listening on port ${port}`));