const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { userModel, validUser, genToken, validLogin } = require("../models/userModel");

const { Authtoken } = require("../auth/Authtoken");



router.post("/", async (req, res) => {

    let validBody = validUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {
        let user = new userModel(req.body);
        user.pass = await bcrypt.hash(user.pass, 10);
        await user.save();
        user.pass = "*****";
        res.json(user)
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err: "email alredy exites or another problem" })
    }

})


router.post("/login", async (req, res) => {

    let validBody = validLogin(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    let user = await userModel.findOne({ email: req.body.email });

    if (!user) {
        return res.status(401).json({ msg: "user or password are rong" })
    }

    let pass_valid = await bcrypt.compare(req.body.pass, user.pass);
    if (!pass_valid) {
        return res.status(401).json({ msg: "user or password are rong" })
    }

    let newToken = genToken(user._id);
    res.json({ token: newToken, user });


})

router.put("/Edit/:idEdit", async (req, res) => {

    try {

        let data = await userModel.updateOne({ email: req.params.idEdit }, req.body);
        res.json(data);
    }
    catch (err) {

        console.log(err);
        res.status(400).send(err);
    }


})

router.delete("/Delete/:idDel", async (req, res) => {

    try {

        let data = await userModel.deleteOne({ _id: req.params.idDel });
        res.json(data);
    }
    catch (err) {

        console.log(err);
        res.status(400).send(err);
    }


})





router.get("/userinfo", Authtoken, async (req, res) => {

    let user = await userModel.findOne({ _id: req.tokendata._id }, { pass: 0 })

    res.json(user);

})


router.get("/give", async (req, res) => {

    let data = await userModel.find({});

    res.json(data);

})



router.get("/:student", async (req, res) => {

    let data = await userModel.find({ email: req.params.student });

    res.json(data);

})



router.get("/giveTeacher/get", async (req, res) => {


    let data = await userModel.find({ usertype: "teacher" });
    res.json(data[0].available);


})


router.get("/student/getallStudent", async (req, res) => {

    let ar = [];
    let obj = {};
    let data = await userModel.find({ usertype: "student" });
    for (let i = 0; i < data.length; i++) {
        obj = {
            name: data[i].name,
            email: data[i].email
        }
        ar.push(obj)
    }

    res.json(ar);


})

router.get("/messege/:email", async (req, res) => {
    let Ar = {};
    let data = await userModel.find({ email: req.params.email });
    
    Ar = data[0].Messeges;
    res.json(Ar);

})


module.exports = router;

