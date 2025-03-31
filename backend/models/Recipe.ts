import {
  DataTypes, Model, InferAttributes, InferCreationAttributes,
  CreationOptional, NonAttribute, Association, BelongsToManyAddAssociationMixin,
  BelongsToManySetAssociationsMixin
} from 'sequelize'
import { sequelize } from '../config/database'

import Ingredient from './Ingredient'


class Recipe extends Model<InferAttributes<Recipe>, InferCreationAttributes<Recipe>> {
  declare id: CreationOptional<number>
  declare name: string

  declare Ingredients?: NonAttribute<Ingredient[]>

  // ✅ These are Sequelize mixins for relation methods
  declare addIngredient: BelongsToManyAddAssociationMixin<Ingredient, number>
  declare setIngredients: BelongsToManySetAssociationsMixin<Ingredient, number>


  declare static associations: {
    Ingredients: Association<Recipe, Ingredient>
  }
}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Recipe',
  },
)

export default Recipe

