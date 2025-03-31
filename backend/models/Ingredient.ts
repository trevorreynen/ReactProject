import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { sequelize } from '../config/database'

// Define Ingredient model using Sequelize's Model typing utilities
class Ingredient extends Model<InferAttributes<Ingredient>, InferCreationAttributes<Ingredient>> {
  declare id: CreationOptional<number>
  declare name: string
}

Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Ingredient',
  },
)

export default Ingredient

