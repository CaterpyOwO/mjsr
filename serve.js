const express = require("express");
let host = "127.0.0.1";
let port = 8080;

let app = express();
app.use("/", express.static(__dirname + "/src/"));
app.listen(port, host);

console.log("Running development build on http://localhost:" + port + "/dev.html");
