//import IngredientSummary from '@/components/Tables/IngredientSummary/IngredientSummary'

// =========================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'

// =========================< IMPORTS: LAYOUT >================================

// =========================< IMPORTS: OTHER >=================================
import { fetchIngredientSummary } from '@/api/ingredients'
import { ColumnConfig } from '@/types/UniversalTableTypes'

// =========================< IMPORTS: COMPONENTS >============================
import UniversalTable from '@/components/Tables/UniversalTable/UniversalTable'

// =========================< IMPORTS: CSS >===================================
import './IngredientSummary.scss'



export default function IngredientSummary() {
  const [summary, setSummary] = useState<Record<string, number>>({})
  const [owned, setOwned] = useState<Record<string, number>>({})

  useEffect(() => {
    fetchIngredientSummary().then(setSummary)
  }, [])

  const updateOwned = (ingredient: string, value: number) => {
    setOwned((prev) => ({ ...prev, [ingredient]: value }))
  }

  const data = Object.keys(summary).map((name) => {
    const total = summary[name] || 0
    const ownedQty = owned[name] || 0
    const toBuy = Math.max(0, total - ownedQty)

    return {
      name,
      total,
      owned: ownedQty,
      toBuy,
    }
  })

  const columns: ColumnConfig[] = [
    {
      key: 'name',
      label: 'Ingredient',
      type: 'text',
      width: '160px',
      textStyle: {
        //align: '',
        wrap: false,
      },
    },
    {
      key: 'total',
      label: 'Total For All Recipes',
      type: 'text',
      width: '100px',
      textStyle: {
        align: 'center',
        wrap: false,
      },
    },
    {
      key: 'owned',
      label: 'Total Owned',
      type: 'input',
      width: '90px',
      textStyle: {
        align: 'center',
        wrap: false,
      },
    },
    {
      key: 'toBuy',
      label: 'Total To Purchase',
      type: 'text',
      width: '100px',
      textStyle: {
        align: 'center',
        wrap: false,
      },
    },
  ]


  return (
    <div className='IngredientSummary'>


      <div className='IngredientSummary'>
          <UniversalTable
          columns={columns}
          data={data}
          onChange={(rowIndex, key, value) => {
            if (key === 'owned') {
              const ingredientName = data[rowIndex].name
              updateOwned(ingredientName, parseFloat(value) || 0)
            }
          }}
        />
      </div>




    </div>
  )
}

