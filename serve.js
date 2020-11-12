let host = "127.0.0.1";
let port = 8080;
let express = require("express");

let app = express();
app.use("/", express.static(__dirname + "/"));
app.listen(port, host);

console.log("Running server at http://localhost:" + port + "/");
