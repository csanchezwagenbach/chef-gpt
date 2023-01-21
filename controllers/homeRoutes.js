const router = require("express").Router();
const { User, Prompt, Suggestion, Restriction, Ingredient } = require("../models");
const withAuth = require("../utils/auth");


router.get("/", withAuth, async (req, res) => {
    try {
        res.render("homepage", { logged_in: true })
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
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
            include: [
                {
                    model: Suggestion
                }
            ]
        });

        const user = userData.get({ plain: true });
        
        res.render("profile", { ...user, logged_in: true });
        // This route will be fleshed out with information that is sent to the template once the user database is seeded and api routes are all functional
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.get("/suggestion/:id", async (req, res) => {
    try {
        const suggestionData = await Suggestion.findByPk(req.params.id, {
            include: [
                {
                model: [{ model: Ingredient, through: Prompt }, { model: Restriction, through: Prompt}]
                }
            ]
        })

        const suggestion = suggestionData.get({ plain: true });
        res.render("suggestion", suggestion)
        // This route will be fleshed out with information that is sent to the template once the user database and suggestions database is seeded and api routes are all functional
    } catch (err) {
        res.status(500).json(err)
    }
});

// One more view to be created that will be request.handlebars, this will be a get request to /:user_id/newrequest


module.exports = router;