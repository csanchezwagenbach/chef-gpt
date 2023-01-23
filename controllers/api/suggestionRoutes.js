const { Suggestion } = require("../../models");
const router = require("express").Router();
//post route for suggestion
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const content = encodeURI(req.body.content);
    const user_id = req.session.user_id;
    console.log(title);
    console.log(content);
    console.log(user_id);
    const newSuggestion = await Suggestion.create({
      title,
      content,
      user_id,
    });
    console.log(newSuggestion);
    res.status(200).json(newSuggestion);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
module.exports = router;
