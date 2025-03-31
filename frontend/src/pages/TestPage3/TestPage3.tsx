// =========================< IMPORTS: REACT >=================================
import { useContext, useMemo } from 'react'

// =========================< IMPORTS: LAYOUT >================================


// =========================< IMPORTS: OTHER >=================================


// =========================< IMPORTS: COMPONENTS >============================
import NutritionFactTable from '@/components/Tables/NutritionFactTable/NutritionFactTable'

// =========================< IMPORTS: STYLES >================================
import './TestPage3.scss'


export default function TestPage3() {
  return (
    <div className='TestPage3'>


      <div>Nutrition Fact Table</div>


      <NutritionFactTable />


    </div>
  )
}

