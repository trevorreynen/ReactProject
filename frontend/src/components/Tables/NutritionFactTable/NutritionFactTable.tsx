//import NutritionFactTable from '@/components/Tables/NutritionFactTable/NutritionFactTable'

// =========================< IMPORTS: REACT >=================================
import React, { useMemo } from 'react'

// =========================< IMPORTS: LAYOUT >================================


// =========================< IMPORTS: OTHER >=================================


// =========================< IMPORTS: COMPONENTS >============================
import UniversalTable from '@/components/Tables/UniversalTable/UniversalTable'
import { ColumnConfig } from '@/types/UniversalTableTypes'
import { ProductEntry, HeaderRow } from '@/types/NutritionFactTableTypes'

// =========================< IMPORTS: CSS >===================================
import './NutritionFactTable.scss'


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
  { key: '20', label: 'Copper' },
  { key: '21', label: 'Folate/Folic Acid' },
  { key: '22', label: 'Iron' },
  { key: '23', label: 'Magnesium' },
  { key: '24', label: 'Niacin (Vit. B3)' },
  { key: '25', label: 'Pantothenic Acid (Vit. B5)' },
  { key: '26', label: 'Phosphorus' },
  { key: '27', label: 'Potassium' },
  { key: '28', label: 'Riboflavin' },
  { key: '29', label: 'Selenium' },
  { key: '30', label: 'Thiamin' },
  { key: '31', label: 'Vitamin A' },
  { key: '32', label: 'Vitamin B₆' },
  { key: '33', label: 'Vitamin B₁₂' },
  { key: '34', label: 'Vitamin C' },
  { key: '35', label: 'Vitamin D' },
  { key: '36', label: 'Vitamin E' },
  { key: '37', label: 'Vitamin K' },
  { key: '38', label: 'Zinc' },
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


type Props = {
  entries: ProductEntry[]
  canEditProduct?: boolean
  onEditProduct?: (product: ProductEntry) => void
}


export default function NutritionFactTable({ entries, canEditProduct, onEditProduct }: Props) {
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
        _meta: {},
      }

      entries.forEach((product, i) => {
        const baseKey = `p${i}`

        subRow[`${baseKey}_unit`] = 'Unit'
        subRow[`${baseKey}_dv`] = '% DV'

        subRow._meta[`${baseKey}_unit`] = { colSpan: 1 }
        subRow._meta[`${baseKey}_dv`] = { colSpan: 1 }
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

  /*
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
  */

  const customHeaderRows = [
    <tr key='product-header'>
      <th key='nutrient-header'></th>
      {entries.map((product, i) => (
        <th
          key={`p${i}-main`}
          colSpan={2}
          className='product-header'
          style={{ position: 'relative' }}
        >
          {product.name}
          {canEditProduct && (
            <span
              className='edit-icon'
              onClick={(e) => {
                e.stopPropagation()
                onEditProduct && onEditProduct(product)
              }}
            ></span>
          )}
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
