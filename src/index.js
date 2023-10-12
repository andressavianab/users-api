var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var router = require("./routes/routes");
require("dotenv").config();
var PORT = process.env.PORT;
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/", router);

app.listen(PORT,() => {
    console.log("Servidor rodando");
});
