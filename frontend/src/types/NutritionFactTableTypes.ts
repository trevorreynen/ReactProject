// import { ProductEntry, HeaderRow } from '@/types/NutritionFactTableTypes'


export type ProductEntry = {
  name: string
  values: Record<
    string,
    {
      unit: string
      dailyValue?: string // optional if not applicable
    }
  >
  id?: number
}

export type HeaderRow = {
  key: string
  label: string
  bold?: boolean
  children?: HeaderRow[]
}

// src/types/NutritionFactTableTypes.ts

export type NutritionProduct = {
  id: number

  productName: string

  servingSize: string
  servingSizeMeasurement: string

  calories: string

  totalFat_Unit?: string
  totalFat_DV?: string

  saturatedFat_Unit?: string
  saturatedFat_DV?: string

  transFat_Unit?: string
  transFat_DV?: string

  polyunsaturatedFat_Unit?: string
  polyunsaturatedFat_DV?: string

  monounsaturatedFat_Unit?: string
  monounsaturatedFat_DV?: string

  cholesterol_Unit?: string
  cholesterol_DV?: string

  sodium_Unit?: string
  sodium_DV?: string

  totalCarbohydrate_Unit?: string
  totalCarbohydrate_DV?: string

  dietaryFiber_Unit?: string
  dietaryFiber_DV?: string

  solubleFiber_Unit?: string
  solubleFiber_DV?: string

  insolubleFiber_Unit?: string
  insolubleFiber_DV?: string

  totalSugars_Unit?: string
  totalSugars_DV?: string

  addedSugars_Unit?: string
  addedSugars_DV?: string

  erythritol_Unit?: string
  erythritol_DV?: string

  protein_Unit?: string
  protein_DV?: string

  calcium_Unit?: string
  calcium_DV?: string

  copper_Unit?: string
  copper_DV?: string

  folate_Unit?: string
  folate_DV?: string

  iron_Unit?: string
  iron_DV?: string

  magnesium_Unit?: string
  magnesium_DV?: string

  niacin_Unit?: string
  niacin_DV?: string

  pantothenicAcid_Unit?: string
  pantothenicAcid_DV?: string

  phosphorus_Unit?: string
  phosphorus_DV?: string

  potassium_Unit?: string
  potassium_DV?: string

  riboflavin_Unit?: string
  riboflavin_DV?: string

  selenium_Unit?: string
  selenium_DV?: string

  thiamin_Unit?: string
  thiamin_DV?: string

  vitaminA_Unit?: string
  vitaminA_DV?: string

  vitaminB6_Unit?: string
  vitaminB6_DV?: string

  vitaminB12_Unit?: string
  vitaminB12_DV?: string

  vitaminC_Unit?: string
  vitaminC_DV?: string

  vitaminD_Unit?: string
  vitaminD_DV?: string

  vitaminE_Unit?: string
  vitaminE_DV?: string

  vitaminK_Unit?: string
  vitaminK_DV?: string

  zinc_Unit?: string
  zinc_DV?: string

  createdAt?: string
  updatedAt?: string
}

