// import { formFields } from '@/config/NutritionProductFormModalConfig'

import { ModalField } from '@/types/UniversalFormModalTypes'

/*
const modalHeader: ModalField[][] = [
  [{ type: 'header-main', label: 'Add Product Nutrition Fact' }], // Modal Header/Title
]
*/

const productInformation: ModalField[][] = [
  [{ type: 'header-secondary', label: 'Important Product Details' }], // Modal First "Section" Header. Header Secondary.
  [
    { type: 'row/section-header', label: 'Product Name' },
    { type: 'text-input', key: 'productName', placeholder: 'Name', required: true },
  ],
  [
    { type: 'row/section-header', label: 'Serving Size' },
    { type: 'text-input', key: 'servingSize', placeholder: '#', required: true },
    { type: 'text-input', key: 'servingSizeMeasurement', placeholder: 'Measuring Unit', required: true },
  ],
  [
    { type: 'row/section-header', label: 'Calories' },
    { type: 'text-input', key: 'calories', label: 'Calories per Serving', placeholder: '#', required: true },
  ],
]


const coreNutrients = [
  'Total Fat',
  'Saturated Fat',
  'Trans Fat',
  'Polyunsaturated Fat',
  'Monounsaturated Fat',
  'Cholesterol',
  'Sodium',
  'Total Carbohydrate',
  'Dietary Fiber',
  'Soluble Fiber',
  'Insoluble Fiber',
  'Total Sugars',
  'Added Sugars',
  'Erythritol',
  'Protein',
]

const microNutrients = [
  'Calcium',
  'Copper',
  'Folate/Folic Acid',
  'Iron',
  'Magnesium',
  'Niacin (Vit. B₃)',
  'Pantothenic Acid (Vit. B₅)',
  'Phosphorus',
  'Potassium',
  'Riboflavin',
  'Selenium',
  'Thiamin (Vit. B₁)',
  'Vitamin A',
  'Vitamin B₆',
  'Vitamin B₁₂',
  'Vitamin C',
  'Vitamin D',
  'Vitamin E',
  'Vitamin K',
  'Zinc',
]

function sanitizeKey(label: string): string {
  if (label === 'Folate/Folic Acid') {
    return 'folate'
  }

  let clean = label.replace(/\s*\(.*?\)/g, '')        // Remove (X) parts
  clean = clean.replace('₆', '6').replace('₁₂', '12').replace('₁', '1') // Subscript to numbers
  clean = clean.replace(/\s+/g, '')                   // Remove spaces
  return clean.charAt(0).toLowerCase() + clean.slice(1) // Lowercase first letter
}

function generateFieldRows(nutrients: string[]): ModalField[][] {
  return nutrients.map((label) => {
    const key = sanitizeKey(label)
    return [
      { type: 'row/section-header', label },
      { type: 'text-input', key: `${key}_unit`, label: '', placeholder: 'Unit' },
      { type: 'text-input', key: `${key}_dv`,   label: '', placeholder: '% DV' },
    ]
  })
}

const productCoreNutrients: ModalField[][] = [
  [{ type: 'header-secondary', key: 'header4', label: 'Core Nutrients Section' }],
  ...generateFieldRows(coreNutrients)
]

const productMicroNutrients: ModalField[][] = [
  [{ type: 'header-secondary', key: 'header5', label: 'Micronutrients Section' }],
  ...generateFieldRows(microNutrients)
]

// Debug the results visually
//console.log('Core:', JSON.stringify(productCoreNutrients, null, 2))
//console.log('Micro:', JSON.stringify(productMicroNutrients, null, 2))


export const formFields: ModalField[][] = [
  //...modalHeader,
  ...productInformation,
  ...productCoreNutrients,
  ...productMicroNutrients
]

