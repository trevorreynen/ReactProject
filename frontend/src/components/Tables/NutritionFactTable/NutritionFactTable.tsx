//import NutritionFactTable from '@/components/Tables/NutritionFactTable/NutritionFactTable'

// =========================< IMPORTS: REACT >=================================
import React, { useMemo } from 'react'

// =========================< IMPORTS: LAYOUT >================================


// =========================< IMPORTS: OTHER >=================================


// =========================< IMPORTS: COMPONENTS >============================
import UniversalTable from '@/components/Tables/UniversalTable/UniversalTable'
import { ColumnConfig } from '@/components/Tables/UniversalTable/TableTypes'

// =========================< IMPORTS: CSS >===================================
import './NutritionFactTable.scss'


// Types for your nutrition table data.
type ProductEntry = {
  name: string
  values: Record<
    string,
    {
      unit: string
      dailyValue?: string // optional if not applicable
    }
  >
}


type HeaderRow = {
  key: string
  label: string
  bold?: boolean
  children?: HeaderRow[]
}


const entries: ProductEntry[] = [
  {
    name: 'Tyson Chicken Nuggets',
    values: {
      '1': { unit: '4' }, // Serving Size
      '2': { unit: 'pieces' }, // Serving Size Measurement
      '3': { unit: '240', dailyValue: '' }, // Calories (per serving)
      '4': { unit: '14g', dailyValue: '18%' }, // Total Fat
      '5': { unit: '3.5g', dailyValue: '18%' }, // Saturated Fat
      '6': { unit: '0g', dailyValue: '' }, // Trans Fat
      '7': { unit: '5g', dailyValue: '' }, // Polyunsaturated Fat
      '8': { unit: '5g', dailyValue: '' }, // Monounsaturated Fat
      '9': { unit: '40mg', dailyValue: '13%' }, // Cholesterol
      '10': { unit: '500mg', dailyValue: '22%' }, // Sodium
      '11': { unit: '14g', dailyValue: '5%' }, // Total Carbohydrate
      '12': { unit: '1g', dailyValue: '4%' }, // Dietary Fiber
      '13': { unit: '', dailyValue: '' }, // Soluble Fiber
      '14': { unit: '', dailyValue: '' }, // Insoluble Fiber
      '15': { unit: '0g', dailyValue: '' }, // Total Sugars
      '16': { unit: '0g', dailyValue: '0%' }, // Includes Added Sugars
      '17': { unit: '', dailyValue: '' }, // Erythritol
      '18': { unit: '13g', dailyValue: '26%' }, // Protein
      //------------------------------------------------------------\\
      '19': { unit: '0mg', dailyValue: '0%' }, // Calcium
      '20': { unit: '', dailyValue: '' }, // Folate
      '21': { unit: '1mg', dailyValue: '4%' }, // Iron
      '22': { unit: '', dailyValue: '' }, // Niacin (Vit. B3)
      '23': { unit: '', dailyValue: '' }, // Pantothenic Acid (Vit. B5)
      '24': { unit: '210mg', dailyValue: '4%' }, // Potassium
      '25': { unit: '', dailyValue: '' }, // Riboflavin
      '26': { unit: '', dailyValue: '' }, // Selenium
      '27': { unit: '', dailyValue: '' }, // Thiamin
      '28': { unit: '', dailyValue: '' }, // Vitamin A
      '29': { unit: '', dailyValue: '' }, // Vitamin B₆
      '30': { unit: '', dailyValue: '' }, // Vitamin B₁₂
      '31': { unit: '', dailyValue: '' }, // Vitamin C
      '32': { unit: '0mcg', dailyValue: '0%' }, // Vitamin D
      '33': { unit: '', dailyValue: '' }, // Vitamin E
      '34': { unit: '', dailyValue: '' }, // Zinc
    },
  },
  {
    name: 'Red Baron Pepperoni Pizza (Fronzen)',
    values: {
      '1': { unit: '1/4' }, // Serving Size
      '2': { unit: 'Pizza' }, // Serving Size Measurement
      '3': { unit: '380', dailyValue: '' }, // Calories (per serving)
      '4': { unit: '18g', dailyValue: '23%' }, // Total Fat
      '5': { unit: '9g', dailyValue: '43%' }, // Saturated Fat
      '6': { unit: '0g', dailyValue: '' }, // Trans Fat
      '7': { unit: '', dailyValue: '' }, // Polyunsaturated Fat
      '8': { unit: '', dailyValue: '' }, // Monounsaturated Fat
      '9': { unit: '45mg', dailyValue: '15%' }, // Cholesterol
      '10': { unit: '800mg', dailyValue: '35%' }, // Sodium
      '11': { unit: '40g', dailyValue: '14%' }, // Total Carbohydrate
      '12': { unit: '2g', dailyValue: '7%' }, // Dietary Fiber
      '13': { unit: '', dailyValue: '' }, // Soluble Fiber
      '14': { unit: '', dailyValue: '' }, // Insoluble Fiber
      '15': { unit: '8g', dailyValue: '' }, // Total Sugars
      '16': { unit: '1g', dailyValue: '3%' }, // Includes Added Sugars
      '17': { unit: '', dailyValue: '' }, // Erythritol
      '18': { unit: '15g', dailyValue: '27%' }, // Protein
      //------------------------------------------------------------\\
      '19': { unit: '250mcg', dailyValue: '20%' }, // Calcium
      '20': { unit: '', dailyValue: '' }, // Folate
      '21': { unit: '2.5mg', dailyValue: '15%' }, // Iron
      '22': { unit: '', dailyValue: '' }, // Niacin (Vit. B3)
      '23': { unit: '', dailyValue: '' }, // Pantothenic Acid (Vit. B5)
      '24': { unit: '310mg', dailyValue: '6%' }, // Potassium
      '25': { unit: '', dailyValue: '' }, // Riboflavin
      '26': { unit: '', dailyValue: '' }, // Selenium
      '27': { unit: '', dailyValue: '' }, // Thiamin
      '28': { unit: '', dailyValue: '' }, // Vitamin A
      '29': { unit: '', dailyValue: '' }, // Vitamin B₆
      '30': { unit: '', dailyValue: '' }, // Vitamin B₁₂
      '31': { unit: '', dailyValue: '' }, // Vitamin C
      '32': { unit: '0mcg', dailyValue: '0%' }, // Vitamin D
      '33': { unit: '', dailyValue: '' }, // Vitamin E
      '34': { unit: '', dailyValue: '' }, // Zinc
    },
  },
]

/*
{
  name: '',
  values: {
    '1': { unit: '' }, // Serving Size
    '2': { unit: '' }, // Serving Size Measurement
    '3': { unit: '', dailyValue: '' }, // Calories (per serving)
    '4': { unit: '', dailyValue: '' }, // Total Fat
    '5': { unit: '', dailyValue: '' }, // Saturated Fat
    '6': { unit: '', dailyValue: '' }, // Trans Fat
    '7': { unit: '', dailyValue: '' }, // Polyunsaturated Fat
    '8': { unit: '', dailyValue: '' }, // Monounsaturated Fat
    '9': { unit: '', dailyValue: '' }, // Cholesterol
    '10': { unit: '', dailyValue: '' }, // Sodium
    '11': { unit: '', dailyValue: '' }, // Total Carbohydrate
    '12': { unit: '', dailyValue: '' }, // Dietary Fiber
    '13': { unit: '', dailyValue: '' }, // Soluble Fiber
    '14': { unit: '', dailyValue: '' }, // Insoluble Fiber
    '15': { unit: '', dailyValue: '' }, // Total Sugars
    '16': { unit: '', dailyValue: '' }, // Includes Added Sugars
    '17': { unit: '', dailyValue: '' }, // Erythritol
    '18': { unit: '', dailyValue: '' }, // Protein
    //------------------------------------------------------------\\
    '19': { unit: '', dailyValue: '' }, // Calcium
    '20': { unit: '', dailyValue: '' }, // Folate
    '21': { unit: '', dailyValue: '' }, // Iron
    '22': { unit: '', dailyValue: '' }, // Niacin (Vit. B3)
    '23': { unit: '', dailyValue: '' }, // Pantothenic Acid (Vit. B5)
    '24': { unit: '', dailyValue: '' }, // Potassium
    '25': { unit: '', dailyValue: '' }, // Riboflavin
    '26': { unit: '', dailyValue: '' }, // Selenium
    '27': { unit: '', dailyValue: '' }, // Thiamin
    '28': { unit: '', dailyValue: '' }, // Vitamin A
    '29': { unit: '', dailyValue: '' }, // Vitamin B₆
    '30': { unit: '', dailyValue: '' }, // Vitamin B₁₂
    '31': { unit: '', dailyValue: '' }, // Vitamin C
    '32': { unit: '', dailyValue: '' }, // Vitamin D
    '33': { unit: '', dailyValue: '' }, // Vitamin E
    '34': { unit: '', dailyValue: '' }, // Zinc
  }
},
*/


const columnOneHeaders: HeaderRow[] = [
  {
    key: '1',
    label: 'Serving Size',
    bold: true,
    children: [{ key: '2', label: 'Serving Size Measurement', bold: true }],
  },
  {
    key: '3',
    label: 'Calories (per serving)',
    bold: true,
  },
  {
    key: '4',
    label: 'Total Fat',
    bold: true,
    children: [
      { key: '5', label: 'Saturated Fat', bold: false },
      { key: '6', label: 'Trans Fat', bold: false },
      { key: '7', label: 'Polyunsaturated Fat', bold: false },
      { key: '8', label: 'Monounsaturated Fat', bold: false },
    ],
  },
  {
    key: '9',
    label: 'Cholesterol',
    bold: true,
  },
  {
    key: '10',
    label: 'Sodium',
    bold: true,
  },
  {
    key: '11',
    label: 'Total Carbohydrate',
    bold: true,
    children: [
      {
        key: '12',
        label: 'Dietary Fiber',
        bold: false,
        children: [
          { key: '13', label: 'Soluble Fiber', bold: false },
          { key: '14', label: 'Insoluble Fiber', bold: false },
        ],
      },
      {
        key: '15',
        label: 'Total Sugars',
        bold: false,
        children: [{ key: '16', label: 'Includes Added Sugars', bold: false }],
      },
      { key: '17', label: 'Erythritol', bold: false },
    ],
  },
  {
    key: '18',
    label: 'Protein',
    bold: true,
    children: [],
  },

  { key: '19', label: 'Calcium' },
  { key: '20', label: 'Folate' },
  { key: '21', label: 'Iron' },
  { key: '22', label: 'Niacin (Vit. B3)' },
  { key: '23', label: 'Pantothenic Acid (Vit. B5)' },
  { key: '24', label: 'Potassium' },
  { key: '25', label: 'Riboflavin' },
  { key: '26', label: 'Selenium' },
  { key: '27', label: 'Thiamin' },
  { key: '28', label: 'Vitamin A' },
  { key: '29', label: 'Vitamin B₆' },
  { key: '30', label: 'Vitamin B₁₂' },
  { key: '31', label: 'Vitamin C' },
  { key: '32', label: 'Vitamin D' },
  { key: '33', label: 'Vitamin E' },
  { key: '34', label: 'Zinc' },
]


// Helper to flatten nested headers into a simple array with indent level.
function flattenHeaders(
  headers: HeaderRow[],
  level: number = 0,
): {
  key: string
  label: string
  bold?: boolean
  indent: number
}[] {
  let flat: { key: string; label: string; bold?: boolean; indent: number }[] = []

  headers.forEach((header) => {
    // Skip key '2' because it’s rendered inline with key '1'
    if (header.key === '2') {
      return
    }

    flat.push({ key: header.key, label: header.label, bold: header.bold, indent: level })

    if (header.children) {
      flat = flat.concat(flattenHeaders(header.children, level + 1))
    }
  })

  return flat
}


export default function NutritionFactTable() {
  // Flatten nutrient headers.
  const flatHeaders = flattenHeaders(columnOneHeaders)

  // Build table data.
  // Each row represents one nutrient (from flatHeaders).
  // For each product, we add two fields: unit and daily value.
  const tableData = flatHeaders.map((nutrient) => {
    const row: any = { nutrient }
    const meta: Record<string, any> = {}

    entries.forEach((product, i) => {
      const baseKey = `p${i}`

      if (nutrient.key === '1') {
        // For Serving Size, merge key '1' and key '2'
        const servingSize = product.values['1']?.unit || ''
        const servingMeasurement = product.values['2']?.unit || ''

        row[`${baseKey}_unit`] = servingSize
        meta[`${baseKey}_unit`] = {}

        row[`${baseKey}_dv`] = servingMeasurement
        meta[`${baseKey}_dv`] = {}
      } else if (nutrient.key === '3') {
        // For Calories, merge the Unit cell to span both columns
        row[`${baseKey}_unit`] = product.values['3']?.unit || ''
        meta[`${baseKey}_unit`] = { colSpan: 2, cellType: 'header' }
        row[`${baseKey}_dv`] = ''
        meta[`${baseKey}_dv`] = { colSpan: 0 }
      } else {
        row[`${baseKey}_unit`] = product.values[nutrient.key]?.unit || ''
        row[`${baseKey}_dv`] = product.values[nutrient.key]?.dailyValue || ''
      }
    })

    row._meta = meta
    return row
  })


  // Insert a subheader row (for "Unit / %DV") immediately after the Calories row.
  const extendedData: any = []
  flatHeaders.forEach((nutrient, idx) => {
    const mainRow = tableData[idx]
    extendedData.push(mainRow)

    if (nutrient.key === '3') {
      const subRow: any = {
        key: '3.5',
        nutrient: { label: '', indent: 0 },
        isSubheader: true,
      }

      entries.forEach((product, i) => {
        const baseKey = `p${i}`
        subRow[`${baseKey}_unit`] = 'Unit'
        subRow[`${baseKey}_dv`] = '% DV'
      })

      extendedData.push(subRow)
    }
  })


  // Build columns.
  // First column: Nutrient column with a custom render to display indent.
  const nutrientColumn: ColumnConfig = {
    key: 'nutrient',
    label: 'Nutrient',
    type: 'custom',
    render: (value, row) => {
      // For subheader rows, render an empty cell.
      if (row.isSubheader) {
        return ''
      }

      if (!value || typeof value !== 'object') {
        return null
      }

      return (
        <span
          style={{
            paddingLeft: `${value.indent * 20 + 8}px`,
            fontWeight: value.bold ? 'bold' : 'normal',
          }}
        >
          {value.label}
        </span>
      )
    },
    width: '200px',
    textStyle: { align: 'left', wrap: true },
  }


  // For each product in entries, create two columns: one for Unit and one for %DV.
  const productColumns: ColumnConfig[] = []
  entries.forEach((product, i) => {
    const baseKey = `p${i}`

    productColumns.push({
      key: `${baseKey}_unit`,
      label: '',
      type: 'input',
      editable: true,
      width: '100px',
      textStyle: { align: 'center' },
      colSpan: (value, row) => row._meta && row._meta[`${baseKey}_unit`] ? row._meta[`${baseKey}_unit`].colSpan ?? 1 : 1,
      cellType: (value, row) => row._meta && row._meta[`${baseKey}_unit`] ? row._meta[`${baseKey}_unit`].cellType ?? 'normal' : 'normal',
    })

    productColumns.push({
      key: `${baseKey}_dv`,
      label: '',
      type: 'input',
      editable: true,
      width: '100px',
      textStyle: { align: 'center' },
      colSpan: (value, row) => row._meta && row._meta[`${baseKey}_dv`] ? row._meta[`${baseKey}_dv`].colSpan ?? 1 : 1,
      cellType: (value, row) => row._meta && row._meta[`${baseKey}_dv`] ? row._meta[`${baseKey}_dv`].cellType ?? 'normal' : 'normal',
    })
  })


  const columns: ColumnConfig[] = useMemo(() => {
    return [nutrientColumn, ...productColumns]
  }, [nutrientColumn, productColumns])


  const handleUpdate = (rowIndex: number, key: string, newValue: any) => {
    // For demonstration, we'll just log the update.
    console.log('Update at row', rowIndex, 'column', key, 'to', newValue)
  }


  const customHeaderRows = [
    <tr key='product-headers'>
      <th key='nutrient-header'></th>
      {entries.map((product, i) => (
        <th key={`p${i}-main`} colSpan={2} className='product-header'>
          {product.name}
        </th>
      ))}
    </tr>
  ]


  return (
    <div className='NutritionFactTable'>
      <UniversalTable data={extendedData} columns={columns} onChange={handleUpdate} customHeaderRows={customHeaderRows} />
    </div>
  )
}
