//models
const Ingredient = require("./Ingredient");
const Suggestion = require("./Suggestion");
const Prompt = require("./Prompt");
const Restriction = require("./Restriction");
const User = require("./User");

//use models
router.use("/user", userRoutes);
router.use("/ingredient", ingredientRoutes);
router.use("/restriction", restrictionRoutes);
router.use("/suggestion", suggestionRoutes);
router.use("/prompt", promptRoutes);

//belongsToMany's
User.belongsToMany(Ingredient, {
  through: {
    model: Prompt,
    unique: false,
  },
});

Ingredient.belongsToMany(User, {
  through: {
    model: Prompt,
    unique: false,
  },
});
Ingredient.belongsToMany(Restriction, {
  through: {
    model: Prompt,
    unique: false,
  },
});
Restriction.belongsToMany(Ingredient, {
  through: {
    model: Prompt,
    unique: false,
  },
});
Restriction.belongsToMany(User, {
  through: {
    model: Prompt,
    unique: false,
  },
});
User.belongsToMany(Restriction, {
  through: {
    model: Prompt,
    unique: false,
  },
});
Prompt.belongsToMany(User, {
  through: {
    model: Suggestion,
    unique: false,
  },
});
User.belongsToMany(Prompt, {
  through: {
    model: Suggestion,
    unique: false,
  },
});

module.exports = { Ingredient, Prompt, Restriction, Suggestion, User };
