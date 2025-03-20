'use strict'

const { Model } = require('sequelize')


module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      // Define many-to-many relationship with Ingredient through RecipeIngredient
      Recipe.belongsToMany(models.Ingredient, {
        through: models.RecipeIngredient,
        foreignKey: 'recipeId'
      })

      // Ensure Recipe has a relationship with RecipeIngredient
      Recipe.hasMany(models.RecipeIngredient, {
        foreignKey: 'recipeId'
      })
    }
  }

  Recipe.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Recipe',
    },
  )

  return Recipe
}
