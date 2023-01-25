const { Suggestion } = require("../../models");
const router = require("express").Router();

// Route permitting the addition of a new Suggestion received from the API call. This route is hit when the user clicks on the "save" button found on the newsuggestion.handlebars template (public/js/save.js)

router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const content = encodeURI(req.body.content);
    const user_id = req.session.user_id;
    const newSuggestion = await Suggestion.create({
      title,
      content,
      user_id,
    });
    res.status(200).json(newSuggestion);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
