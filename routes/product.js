const express = require("express");
const router = express.Router();
const {productModel} = require('../models/productModel');



router.get("/all", async (req, res) => {

    let data = await productModel.find({});

    res.json(data);

})

router.post("/", async (req, res) => {


    try {
        let product = new productModel(req.body);
        await product.save();
        res.json(product)
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err: "failed to add" })
    }

})

router.get("/one/:id", async (req, res) => {

    let data = await productModel.find({ _id: req.params.id });

    res.json(data);

})

router.delete("/Delete/:idDel", async (req, res) => {

    try {

        let data = await productModel.deleteOne({ _id: req.params.idDel });
        res.json(data);
    }
    catch (err) {

        console.log(err);
        res.status(400).send(err);
    }


})












module.exports = router;