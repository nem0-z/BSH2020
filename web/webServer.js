const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(express.static("JS"));
app.use(express.static(__dirname + "/img/"));
app.use(express.static(__dirname + "/audio/"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(3000, function () {
  console.log("Web app listening on port 3000!");
});
