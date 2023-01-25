const router = require("express").Router();
const {
  User,
  Prompt,
  Suggestion,
  Restriction,
  Ingredient,
} = require("../models");
const withAuth = require("../utils/auth");
const openAi = require("../config/ai");

//homeRoutes holds directions pertaining to all front end engagements on the part of the user. Additionally, the actual API call to the OpenAI completions end point can be found in the routes below. The prompt described just beneath this comment is the introductory remarks we make to the GPT-3 engines. We give the engine an identity and a clearly defined task along with clear expectations as to input it might expect to receive. The construction of this prompt represents the "back end" of the user's mediated interaction with the artificial intelligence. 

//For developers interested in experimenting with other functions, the hard coded prompt serves as an excellent and easily accessible point of entry.

let prompt =
  "You are a professional chef and your task is to assist an amateur cook prepare a meal for themselves at home. You will be given a series of inputs: A list of ingredients a user has or would like to use, a time constraint (if there is any), dietary restrictions (if there are any), and whether or not the use is able to stop by a grocery store (and thus get more ingredients). You must provide a detailed, easy-to-understand recipe and set of instructions for the user, and the tone of the instructions should be encouraging and exciting. Please list out all the required ingredients and hardware at the beginning of your explanation, as though it were a recipe. Please ignore unneccessary input that is not directly tied to a user's desired output. Here is the user's input. Repeat back a user's input before continuing onto your full suggestion.";


// homeRoute rendering homepage only to logged in users
router.get("/", withAuth, async (req, res) => {
  try {
    res.render("homepage", { logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// homeRoute rendering login page

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

// homeRoute grabbing a user's id from the session information and rendering that particular user's dashboard

router.get("/profile", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Suggestion,
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render("profile", { ...user, logged_in: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// homeRoute rendering a specific saved recipe. Suggestion's id is hidden in the data-number attribute of card holding it on the user's dashboard

router.get("/suggestion/:id", withAuth, async (req, res) => {
  try {
    const suggestionData = await Suggestion.findByPk(req.params.id, {
      include: [
        {
          model: Prompt,
          include: [
            {
              model: Ingredient,
            },
            {
              model: Restriction,
            },
          ],
        },
      ],
    });
    const suggestion = suggestionData.get({ plain: true });
    suggestion.content = decodeURI(suggestion.content);
    res.render("suggestion", { suggestion, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST homeRoute that receives a user's input along with the hard coded prompt, and given that request, returns a completion generated by OpenAI's GPT-3 engine.

// For developers interested in experimentation, parameters for completion query are an excellent place to begin. Please reference the Open AI API documentation for more complete details.

router.post("/makesuggestion", withAuth, async (req, res) => {
  try {
    prompt += req.body.ingredients;
    prompt += req.body.restrictions;
    prompt += req.body.detailsToConfirm;
    let suggestionData = await openAi.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.7,
    });
    const suggestion = suggestionData.data.choices[0].text;
    res.status(200).json({ suggestion });
  } catch (err) {
    res.status(500).json(err);
  }
});

// homeRoute rendering a newly received completion. The suggestion's text content is encoded and hidden inside of the query calls made to this route. 

router.get("/newsuggestion", withAuth, async (req, res) => {
  try {
    let suggestion = req.query.suggestion;
    res.render("newsuggestion", { suggestion, logged_in: true });
  } catch {
    res.status(500).json(err);
  }
});

// homeRoute rendering questionnaire form to be sent off to Open AI API. 

router.get("/request", withAuth, async (req, res, next) => {
  try {
    res.render("request", { logged_in: true });
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
