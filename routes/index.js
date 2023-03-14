const express = require("express");

const router = express.Router();



router.get("/",(req,res) => {

    res.json(stats = {
        work:"yes"
    })
})


module.exports = router;