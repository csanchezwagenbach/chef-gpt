const Ingredient = require("./Ingredient");
const Suggestion = require("./Suggestion");
const Prompt = require("./Prompt");
const Restriction = require("./Restriction");
const User = require("./User");

// Many of the models described ultimately represent routes for possible future developments. Possibilities include linking saved ingredients to a user's profile, saved dietary restrictions, etc. For the purposes of a minimally viable product, tables utilized in deoployed application include "User" and "Suggestion"

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

Suggestion.belongsTo(Prompt, {
  foreignKey: "prompt_id"
});

Prompt.belongsTo(Ingredient, {
  foreignKey: "ingredient_id"
});

Prompt.belongsTo(Restriction, {
  foreignKey: "restriction_id"
});



module.exports = { Ingredient, Prompt, Restriction, Suggestion, User };
