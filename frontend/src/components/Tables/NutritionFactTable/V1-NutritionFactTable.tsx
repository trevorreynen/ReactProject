//import NutritionFactTable from '@/components/Tables/NutritionFactTable/NutritionFactTable'

// =========================< IMPORTS: REACT >=================================
import { JSX } from 'react'

// =========================< IMPORTS: LAYOUT >================================


// =========================< IMPORTS: OTHER >=================================


// =========================< IMPORTS: COMPONENTS >============================


// =========================< IMPORTS: CSS >===================================
import './NutritionFactTable.scss'


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

const columnOneHeaders = [
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


// Recursive renderer for the leftmost column + row data
function renderRows(headers: HeaderRow[], level: number = 0): JSX.Element[] {
  const rows: JSX.Element[] = []

  headers.flatMap((row) => {
    if (row.key === '2') {
      // skip key=2 since it's rendered inside key=1 now
      return
    }

    const separatorKeys = ['18']
    const rowClassName = separatorKeys.includes(row.key) ? 'section-separator' : ''

    const basePadding = 4
    const indent = basePadding + (level * 20)
    const isServingSize = row.key === '1'
    const isCalories = row.key === '3'


    const labelCell = (
      <td key={`label-${row.key}`} style={{ paddingLeft: `${indent}px`, fontWeight: row.bold ? 'bold' : 'normal' }}>{row.label}</td>
    )

    const valueCells = entries.flatMap((entry) => {
      if (isServingSize) {
        const serving = entry.values['1']?.unit ?? ''
        const servingMeasurement = entry.values['2']?.unit ?? ''

        return [
          <td key={`${entry.name}-1`}>{serving}</td>,
          <td key={`${entry.name}-1b`}>{servingMeasurement}</td>
        ]
      }

      const val = entry.values[row.key] || {}
      return [
        <td key={`${entry.name}-${row.key}-unit`} className='text-center'>{val.unit || ''}</td>,
        <td key={`${entry.name}-${row.key}-dv`} className='text-center'>{val.dailyValue || ''}</td>,
      ]
    })

    rows.push(
      <tr key={`row-${row.key}`} className={rowClassName}>
        {labelCell}
        {valueCells}
      </tr>
    )


    // Insert "Unit / %DV" header row right after Calories row
    if (isCalories) {
      rows.push(
        <tr key='subheaders'>
          <td></td>
          {entries.flatMap((entry) => [
            <td key={`${entry.name}-subheader-unit`} className='subheader border-left-separator'>Unit</td>,
            <td key={`${entry.name}-subheader-dv`} className='subheader border-right-separator'>% DV</td>,
          ])}
        </tr>
      )
    }

    // Recursively render children if present
    if (row.children) {
      rows.push(...renderRows(row.children, level + 1))
    }
  })

  return rows
}


export default function NutritionFactTable() {
  return (
    <div className='NutritionFactTable'>


      <table>
        <colgroup>
          <col style={{ width: '200px' }} /> {/* Column 1: Nutrient */}
          {entries.map(() => (
            <>
              <col className='border-left-separator' style={{ width: '100px' }} /> {/* Unit */}
              <col className='border-right-separator' style={{ width: '100px' }} /> {/* %DV */}
            </>
          ))}
        </colgroup>

        <thead>
          <tr>
            <th></th>
            {entries.map((entry) => (
              <th key={`${entry.name}-title`} colSpan={2} className='product-header border-left-separator border-right-separator'>{entry.name}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {renderRows(columnOneHeaders)}
          </tbody>

      </table>


    </div>
  )
}

