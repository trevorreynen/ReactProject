// =========================< IMPORTS: REACT >=================================
import { useState, useMemo } from 'react'

// =========================< IMPORTS: LAYOUT >================================


// =========================< IMPORTS: OTHER >=================================
import { mockData, Person } from './mockData'
import { ColumnConfig } from '@/types/UniversalTableTypes'

// =========================< IMPORTS: COMPONENTS >============================
import UniversalTable from '@/components/Tables/UniversalTable/UniversalTable'

// =========================< IMPORTS: STYLES >================================
import './TestPage4.scss'


export default function TestPage4() {
  const [data, setData] = useState<Person[]>(() => mockData(50)) // 10 mock rows

  const columns: ColumnConfig[] = useMemo(() => [
    {
      key: 'firstName',
      label: 'First Name',
      type: 'input',
      editable: true,
      width: '150px',
      textStyle: { align: 'left', wrap: true },
    },
    {
      key: 'lastName',
      label: 'Last Name',
      type: 'input',
      editable: true,
      width: '150px',
      textStyle: { align: 'left' },
    },
    {
      key: 'age',
      label: 'Age',
      type: 'input',
      editable: true,
      width: '60px',
      textStyle: { align: 'center' },
      colSpan: () => 2,
    },
    {
      key: 'visits',
      label: 'Visits',
      type: 'input',
      editable: true,
      width: '90px',
      textStyle: { align: 'right' },
      format: (val: any) => `${val} visits`,
    },
    {
      key: 'progress',
      label: 'Progress',
      type: 'text',
      width: '75px',
      textStyle: { align: 'center' },
      format: (val: any) => `${val}%`,
      colSpan: () => 2,
    },
    {
      key: 'status',
      label: 'Status',
      type: 'dropdown',
      editable: true,
      options: ['relationship', 'complicated', 'single'],
      width: '125px',
      textStyle: { align: 'left' },
    },
  ], [])

  const handleUpdate = (rowIndex: number, key: string, value: any) => {
    const newData = [...data]
    newData[rowIndex] = { ...newData[rowIndex], [key]: value }
    setData(newData)
  }


  return (
    <div className='TestPage4'>


      <div>Universal Table Example w/ Mock Data</div>

      <UniversalTable
        data={data}
        columns={columns}
        onChange={handleUpdate}
        customHeaderRows={[
          <tr key='custom-header-0'>
            {(() => {
              const skipMap = new Set<number>()
              const headerCells: React.ReactNode[] = []

              columns.forEach((col, colIndex) => {
                if (skipMap.has(colIndex)) return

                const colSpan = typeof col.colSpan === 'function'
                  ? col.colSpan(null, {}, 0)
                  : col.colSpan ?? 1

                if (colSpan > 1) {
                  for (let i = 1; i < colSpan; i++) {
                    skipMap.add(colIndex + i)
                  }
                }

                headerCells.push(
                  <th
                    key={`header-${colIndex}`}
                    colSpan={colSpan}
                    style={{ textAlign: 'center' }}
                  >
                    {col.label}
                  </th>
                )
              })

              return headerCells
            })()}
          </tr>
        ]}
      />



    </div>
  )
}

