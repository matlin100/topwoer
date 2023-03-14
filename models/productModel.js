const mongoose = require("mongoose");





const productSchema = new mongoose.Schema({

    name:String,
    img:String,
    price:Number,
    about:String,
    category:String
  

    
    })
    
exports.productModel = mongoose.model("products",productSchema);
    