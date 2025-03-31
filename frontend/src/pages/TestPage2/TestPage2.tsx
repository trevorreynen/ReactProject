// =========================< IMPORTS: REACT >=================================
import { useContext, useMemo } from 'react'

// =========================< IMPORTS: LAYOUT >================================


// =========================< IMPORTS: OTHER >=================================


// =========================< IMPORTS: COMPONENTS >============================
import IngredientSummary from '@/components/Tables/IngredientSummary/IngredientSummary'

// =========================< IMPORTS: STYLES >================================
import './TestPage2.scss'


export default function TestPage2() {
  return (
    <div className='TestPage2'>


      <div>TW3 Ingredient Summary Table</div>

      <IngredientSummary />


    </div>
  )
}

