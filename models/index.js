//models
const Ingredient = require("./Ingredient");
const Suggestion = require("./Suggestion");
const Prompt = require("./Prompt");
const Restriction = require("./Restriction");
const User = require("./User");


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
Suggestion.belongsTo(User, {
  foreignKey: "user_id",
});
User.hasMany(Suggestion, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { Ingredient, Prompt, Restriction, Suggestion, User };
