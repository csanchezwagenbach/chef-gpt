const router = require("express").Router();
const { User, Prompt, Suggestion, Restriction, Ingredient } = require("../models");


router.get("/", async (req, res) => {
    try {
        res.render("homepage")
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get("/login", async (req, res) => {
    try {
        res.render("login")
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;