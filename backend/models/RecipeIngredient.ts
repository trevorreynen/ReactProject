import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database'
import Recipe from './Recipe'
import Ingredient from './Ingredient'

// Junction table model for Recipe <-> Ingredient many-to-many relationship
class RecipeIngredient extends Model {}

RecipeIngredient.init(
  {
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'RecipeIngredient',
  },
)

// Define many-to-many relationship with an extra 'quantity' field
Recipe.belongsToMany(Ingredient, { through: RecipeIngredient })
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient })

export default RecipeIngredient

