const indexR = require("./index");
const userR = require("./user")
const productR = require("./product");


exports.routeInit = (app) => {

app.use("/",indexR);
app.use("/user",userR);
app.use("/product",productR);


}