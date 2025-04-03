import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { sequelize } from '../config/database'


export class NutritionProduct extends Model<InferAttributes<NutritionProduct>, InferCreationAttributes<NutritionProduct>> {
  declare id: CreationOptional<number>
  declare name: string

  declare servingSize: string
  declare servingSizeMeasurement: string
  declare calories: string

  declare totalFat_Unit: string
  declare totalFat_DV: string

  declare saturatedFat_Unit: string
  declare saturatedFat_DV: string

  declare transFat_Unit: string
  declare transFat_DV: string

  declare polyunsaturatedFat_Unit: string
  declare polyunsaturatedFat_DV: string

  declare monounsaturatedFat_Unit: string
  declare monounsaturatedFat_DV: string

  declare cholesterol_Unit: string
  declare cholesterol_DV: string

  declare sodium_Unit: string
  declare sodium_DV: string

  declare totalCarbohydrate_Unit: string
  declare totalCarbohydrate_DV: string

  declare dietaryFiber_Unit: string
  declare dietaryFiber_DV: string

  declare solubleFiber_Unit: string
  declare solubleFiber_DV: string

  declare insolubleFiber_Unit: string
  declare insolubleFiber_DV: string

  declare totalSugars_Unit: string
  declare totalSugars_DV: string

  declare addedSugars_Unit: string
  declare addedSugars_DV: string

  declare erythritol_Unit: string
  declare erythritol_DV: string

  declare protein_Unit: string
  declare protein_DV: string

  declare calcium_Unit: string
  declare calcium_DV: string

  declare copper_Unit: string
  declare copper_DV: string

  declare folate_Unit: string
  declare folate_DV: string

  declare iron_Unit: string
  declare iron_DV: string

  declare magnesium_Unit: string
  declare magnesium_DV: string

  declare niacin_Unit: string
  declare niacin_DV: string

  declare pantothenicAcid_Unit: string
  declare pantothenicAcid_DV: string

  declare phosphorus_Unit: string
  declare phosphorus_DV: string

  declare potassium_Unit: string
  declare potassium_DV: string

  declare riboflavin_Unit: string
  declare riboflavin_DV: string

  declare selenium_Unit: string
  declare selenium_DV: string

  declare thiamin_Unit: string
  declare thiamin_DV: string

  declare vitaminA_Unit: string
  declare vitaminA_DV: string

  declare vitaminB6_Unit: string
  declare vitaminB6_DV: string

  declare vitaminB12_Unit: string
  declare vitaminB12_DV: string

  declare vitaminC_Unit: string
  declare vitaminC_DV: string

  declare vitaminD_Unit: string
  declare vitaminD_DV: string

  declare vitaminE_Unit: string
  declare vitaminE_DV: string

  declare vitaminK_Unit: string
  declare vitaminK_DV: string

  declare zinc_Unit: string
  declare zinc_DV: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}


NutritionProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    servingSize: DataTypes.STRING,
    servingSizeMeasurement: DataTypes.STRING,
    calories: DataTypes.STRING,

    totalFat_Unit: DataTypes.STRING(15),
    totalFat_DV: DataTypes.STRING(8),

    saturatedFat_Unit: DataTypes.STRING(15),
    saturatedFat_DV: DataTypes.STRING(8),

    transFat_Unit: DataTypes.STRING(15),
    transFat_DV: DataTypes.STRING(8),

    polyunsaturatedFat_Unit: DataTypes.STRING(15),
    polyunsaturatedFat_DV: DataTypes.STRING(8),

    monounsaturatedFat_Unit: DataTypes.STRING(15),
    monounsaturatedFat_DV: DataTypes.STRING(8),

    cholesterol_Unit: DataTypes.STRING(15),
    cholesterol_DV: DataTypes.STRING(8),

    sodium_Unit: DataTypes.STRING(15),
    sodium_DV: DataTypes.STRING(8),

    totalCarbohydrate_Unit: DataTypes.STRING(15),
    totalCarbohydrate_DV: DataTypes.STRING(8),

    dietaryFiber_Unit: DataTypes.STRING(15),
    dietaryFiber_DV: DataTypes.STRING(8),

    solubleFiber_Unit: DataTypes.STRING(15),
    solubleFiber_DV: DataTypes.STRING(8),

    insolubleFiber_Unit: DataTypes.STRING(15),
    insolubleFiber_DV: DataTypes.STRING(8),

    totalSugars_Unit: DataTypes.STRING(15),
    totalSugars_DV: DataTypes.STRING(8),

    addedSugars_Unit: DataTypes.STRING(15),
    addedSugars_DV: DataTypes.STRING(8),

    erythritol_Unit: DataTypes.STRING(15),
    erythritol_DV: DataTypes.STRING(8),

    protein_Unit: DataTypes.STRING(15),
    protein_DV: DataTypes.STRING(8),

    calcium_Unit: DataTypes.STRING(15),
    calcium_DV: DataTypes.STRING(8),

    copper_Unit: DataTypes.STRING(15),
    copper_DV: DataTypes.STRING(8),

    folate_Unit: DataTypes.STRING(15),
    folate_DV: DataTypes.STRING(8),

    iron_Unit: DataTypes.STRING(15),
    iron_DV: DataTypes.STRING(8),

    magnesium_Unit: DataTypes.STRING(15),
    magnesium_DV: DataTypes.STRING(8),

    niacin_Unit: DataTypes.STRING(15),
    niacin_DV: DataTypes.STRING(8),

    pantothenicAcid_Unit: DataTypes.STRING(15),
    pantothenicAcid_DV: DataTypes.STRING(8),

    phosphorus_Unit: DataTypes.STRING(15),
    phosphorus_DV: DataTypes.STRING(8),

    potassium_Unit: DataTypes.STRING(15),
    potassium_DV: DataTypes.STRING(8),

    riboflavin_Unit: DataTypes.STRING(15),
    riboflavin_DV: DataTypes.STRING(8),

    selenium_Unit: DataTypes.STRING(15),
    selenium_DV: DataTypes.STRING(8),

    thiamin_Unit: DataTypes.STRING(15),
    thiamin_DV: DataTypes.STRING(8),

    vitaminA_Unit: DataTypes.STRING(15),
    vitaminA_DV: DataTypes.STRING(8),

    vitaminB6_Unit: DataTypes.STRING(15),
    vitaminB6_DV: DataTypes.STRING(8),

    vitaminB12_Unit: DataTypes.STRING(15),
    vitaminB12_DV: DataTypes.STRING(8),

    vitaminC_Unit: DataTypes.STRING(15),
    vitaminC_DV: DataTypes.STRING(8),

    vitaminD_Unit: DataTypes.STRING(15),
    vitaminD_DV: DataTypes.STRING(8),

    vitaminE_Unit: DataTypes.STRING(15),
    vitaminE_DV: DataTypes.STRING(8),

    vitaminK_Unit: DataTypes.STRING(15),
    vitaminK_DV: DataTypes.STRING(8),

    zinc_Unit: DataTypes.STRING(15),
    zinc_DV: DataTypes.STRING(8),

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'NutritionProduct',
    tableName: 'nutrition_products',
    timestamps: true,
  }
)

  export default NutritionProduct

