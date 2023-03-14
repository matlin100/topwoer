const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const { number, date, object } = require("joi");



const userSchema = new mongoose.Schema({

name:String,
email:String,
pass:String,
usertype:String,
date_created:{
    type:Date,
    default:Date.now()
},

paid: {
    type:Boolean,default:"false"
},
age:String,
gender:{type:String,default:""},
progression:{type:Number,default:0},
lessonNumber:{type:Number,default:0},
courseNumber:{type:Number,default:""},
Messeges:{type:Array,default:[]},
next_Lesson:Array,
// teacher:{type:String,default:""},
students:{type:Array,default:[String]},
childrens:{type:Array,default:[String]}

})

exports.userModel = mongoose.model("users",userSchema);


exports.genToken = (_userid) => {

    let token = jwt.sign({_id:_userid},"secret",{expiresIn:"7days"})
    return token;
}

exports.validUser = (_bodydata) => {

let joiSchema = joi.object({

name:joi.string().min(2).max(9999).required(),
email:joi.string().min(2).max(9999).required().email(),
pass:joi.string().min(2).max(9999).required(),
// repeatpass:joi.string().min(2).max(9999).required(),
age:joi.number(),
gender:joi.string(),
usertype:joi.string()
// paid:joi.string(),
// level:joi.string(),
// progression:joi.string(),
// courseNumber:joi.string(),
// next_Lesson:joi.string(),
// available:joi.string(),
// students:joi.string(),
// childrens:joi.string(),
// teacher:joi.string()


})

return joiSchema.validate(_bodydata);

}


exports.validLogin = (_bodydata) => {

    let joiSchema = joi.object({

        email:joi.string().min(2).max(300).required().email(),
        pass:joi.string().min(2).max(300).required()

    })
    return joiSchema.validate(_bodydata);
}