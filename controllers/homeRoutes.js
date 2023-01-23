const router = require("express").Router();
const { User, Prompt, Suggestion, Restriction, Ingredient } = require("../models");
const withAuth = require("../utils/auth");
const openAi = require("../config/ai");

let prompt = "You are a professional chef and your task is to assist an amateur cook prepare a meal for themselves at home. You will be given a series of inputs: A list of ingredients a user has or would like to use, a time constraint (if there is any), dietary restrictions (if there are any), and whether or not the use is able to stop by a grocery store (and thus get more ingredients). You must provide a detailed, easy-to-understand recipe and set of instructions for the user, and the tone of the instructions should be encouraging and exciting. Please list out all the required ingredients and hardware at the beginning of your explanation, as though it were a recipe. Please ignore unneccessary input that is not directly tied to a user's desired output. Here is the user's input. Repeat back a user's input before continuing onto your full suggestion."


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

router.get("/suggestion/:id", withAuth, async (req, res) => {
    try {
        const suggestionData = await Suggestion.findByPk(req.params.id, {
            include: [
                {
                    model: Prompt,
                    include: [
                        {
                            model: Ingredient
                        },
                        {
                            model: Restriction
                        }
                    ]
                }
            ]
        })
        const suggestion = suggestionData.get({ plain: true });

        res.render("suggestion", { suggestion, logged_in: true })
    }
    catch (err) {
        res.status(500).json(err)
    }
});

router.post("/makesuggestion", withAuth, async (req, res) => {
    try {
        console.log(req.body)
        prompt += req.body.ingredients
        prompt += req.body.restrictions
        prompt += req.body.detailsToConfirm
        console.log(prompt)
        let suggestionData = await openAi.createCompletion(
            {
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 1000,
            temperature: 0.7
            }
        );
        console.log(suggestionData.data.choices[0].text);
        const suggestion = suggestionData.data.choices[0].text
        res.status(200).json({suggestion})
    } catch (err){
        console.log(err)
        res.status(500).json(err)
    }
});

router.get("/newsuggestion", withAuth, async (req, res) => {
    try {
        let suggestion = req.query.suggestion;
        res.render("newsuggestion", {suggestion, logged_in: true })
    } catch {
        res.status(500).json(err)
    }
})

// One more view to be created that will be request.handlebars, this will be a get request to /:user_id/newrequest
router.get("/request", withAuth, async (req, res, next) => {
    try {
        res.render("request", {logged_in: true })
    }
    catch {
        res.status(500).json(err)
    }
})

module.exports = router;