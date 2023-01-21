const sequelize = require("../config/connection");
const { User, Prompt, Suggestion, Restriction, Ingredient } = require("../models");

const userData = require("./userData.json");
const promptData = require("./promptData.json");
// const suggestionData = require("./suggestionData.json");
const restrictionData = require("./restrictionData.json");
const ingredientData = require("./ingredientData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    const ingredients = await Ingredient.bulkCreate(ingredientData, {
        individualHooks: true,
        returning: true
    });

    const restrictions = await Restriction.bulkCreate(restrictionData, {
        individualHooks: true,
        returning: true
    });

    for (const prompt of promptData) {
        await Prompt.create({
            ...prompt,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            restriction_id: restrictions[Math.floor(Math.random() * restrictions.length)].id,
            ingredient_id: ingredients[Math.floor(Math.random() * ingredients.length)].id
        });
    }



    process.exit(0);
};

seedDatabase();