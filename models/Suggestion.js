const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Suggestion extends Model {}

Suggestion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // minutes: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
    is_public: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    date_generated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    prompt_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Prompt",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "suggestion",
  }
);

module.exports = Suggestion;
