// =========================< IMPORTS: REACT >=================================
import { useEffect, useRef } from 'react'

// =========================< IMPORTS: LAYOUT >================================


// =========================< IMPORTS: OTHER >=================================


// =========================< IMPORTS: COMPONENTS >============================
import NewSpreadsheetTable from '@/components/Tables/NewSpreadsheetTable/NewSpreadsheetTable'

// =========================< IMPORTS: STYLES >================================
import './TestPage5.scss'


export default function TestPage5() {


  return (
    <div className='TestPage5'>


      <div>Test Page</div>


      <NewSpreadsheetTable numRows={16} numCols={16} />


    </div>
  )
}

