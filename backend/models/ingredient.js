'use strict'

const { Model } = require('sequelize')


module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    static associate(models) {
      // Correctly define the many-to-many relationship
      Ingredient.belongsToMany(models.Recipe, {
        through: models.RecipeIngredient,
        foreignKey: 'ingredientId'
      })

      // Ensure the association between Ingredient and RecipeIngredient exists
      Ingredient.hasMany(models.RecipeIngredient, {
        foreignKey: 'ingredientId'
      })
    }
  }

  Ingredient.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Ingredient',
    },
  )

  return Ingredient
}
