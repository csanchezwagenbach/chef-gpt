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
        // Potentially put in a logic check that will redirect users to their dashboard page if they are already logged in and they try to navigate here
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get("/profile", async (req, res) => {
    try {
        res.render("profile")
        // This route will be fleshed out with information that is sent to the template once the user database is seeded and api routes are all functional
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get("/:user_id/:suggestion_id", async (req, res) => {
    try {
        res.render("suggestions")
        // This route will be fleshed out with information that is sent to the template once the user database and suggestions database is seeded and api routes are all functional
    } catch (err) {
        res.status(500).json(err)
    }
});

// One more view to be created that will be request.handlebars, this will be a get request to /:user_id/newrequest


module.exports = router;