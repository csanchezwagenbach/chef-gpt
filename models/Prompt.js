const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Prompt extends Model {}

Prompt.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    restriction_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "restriction",
        key: "id",
      },
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "ingredient",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "prompt",
  }
);

module.exports = Prompt;
