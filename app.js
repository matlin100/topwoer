const express = require("express");
const path = require("path");
const http = require("http")
const cors = require("cors");
const {routeInit} = require("./routes/config_routes")
require("./db/mongodb")
const app = express();


app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

app.use(cors());

routeInit(app);

const server = http.createServer(app);

let port = process.env.port || '3000';

server.listen(port);