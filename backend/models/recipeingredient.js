'use strict'

const { Model } = require('sequelize')


module.exports = (sequelize, DataTypes) => {
  class RecipeIngredient extends Model {
    static associate(models) {
      // Ensure RecipeIngredient knows its belongsTo relationships
      RecipeIngredient.belongsTo(models.Recipe, {
        foreignKey: 'recipeId'
      })

      RecipeIngredient.belongsTo(models.Ingredient, {
        foreignKey: 'ingredientId'
      })
    }
  }

  RecipeIngredient.init(
    {
      recipeId: DataTypes.INTEGER,
      ingredientId: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      modelName: 'RecipeIngredient',
    },
  )

  return RecipeIngredient
}
