const jwt = require("jsonwebtoken");

exports.Authtoken = (req,res,next) => {

let token = req.header("x-api-key");

if (!token) {

return res.status(401).json({msg:"no token"});

}

try {
    let decodetoken = jwt.verify(token,"secret")
    req.tokendata = decodetoken ;
    next();
}
catch(err) {
    console.log(err);
    res.status(401).json({msg:"token invalid"});
}

}