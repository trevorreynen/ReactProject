// =========================< IMPORTS: REACT >=================================
import { useContext, useMemo } from 'react'

// =========================< IMPORTS: LAYOUT >================================


// =========================< IMPORTS: OTHER >=================================


// =========================< IMPORTS: COMPONENTS >============================
import RecipeTable from '@/components/Tables/RecipeTable/RecipeTable'

// =========================< IMPORTS: STYLES >================================
import './TestPage1.scss'


export default function TestPage1() {
  return (
    <div className='TestPage1'>


      <div>TW3 Recipe Table</div>

      <RecipeTable />


    </div>
  )
}

